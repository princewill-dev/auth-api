document.getElementById('memberForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const memberId = document.getElementById('memberId').value;
    const apiUrl = `http://127.0.0.1:8000/api/show/${memberId}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            // If the response is not ok, parse the JSON to get the error message
            return response.json().then(err => {
                throw new Error(err.message || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        let member = data.member;

        const formatDate = (dateStr) => {
            const dateObj = new Date(dateStr);
            return dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        };

        let resultHTML = `
            <dt>ID:</dt><dd>${member.id}</dd>
            <dt>Name:</dt><dd>${member.name}</dd>
            <dt>Email:</dt><dd>${member.email}</dd>
            <dt>Phone:</dt><dd>${member.phone}</dd>
            <dt>Created At:</dt><dd>${formatDate(member.created_at)}</dd>
            <dt>Updated At:</dt><dd>${formatDate(member.updated_at)}</dd>
        `;

        document.getElementById('api-result').innerHTML = resultHTML;
    })
    .catch(error => {
        // Displaying the exact error message from the response or a fallback message
        document.getElementById('api-result').textContent = 'Error: ' + error.message;
    });
});
