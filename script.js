document.addEventListener("DOMContentLoaded", function() {
    const inputElem = document.getElementById('input');
    const outputElem = document.getElementById('output');

    inputElem.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const inputValue = inputElem.value;
            outputElem.innerHTML += `<div>Terminal:~$ ${inputValue}</div>`;
            
            inputElem.value = ''; // Clear the input immediately after pressing the enter key
            
            const processingElem = document.createElement('div');
            processingElem.innerText = 'processing...';
            outputElem.appendChild(processingElem);

            // Clear Command
            if (inputValue.trim().toLowerCase() === "clear") {
                outputElem.innerHTML = '';
                inputElem.value = ''; // Clear the input
                return;
            } 
            else if (inputValue.trim().toLowerCase() === "show all users") {
                fetch("https://terminal.princewilldev.com/api/show")
                    .then(response => response.json())
                    .then(data => {
                        outputElem.removeChild(processingElem); // Remove processing message
                        inputElem.value = ''; // Clear the input

                        let formattedOutput = '';
                        if (data.members && Array.isArray(data.members)) {
                            data.members.forEach(member => {
                                formattedOutput += `<div>member ID: ${member.id}</div>`;
                                formattedOutput += `<div>fullname: ${member.name}</div>`;
                                formattedOutput += `<div>email: ${member.email}</div>`;
                                formattedOutput += `<div>Phone: ${member.phone}</div>`;
                                let creationDate = new Date(member.created_at);
                                formattedOutput += `<div>Created on: ${creationDate.toLocaleDateString()} at ${creationDate.toLocaleTimeString()}</div>`;
                                formattedOutput += `<br>`;
                            });
                        }
                        outputElem.innerHTML += `<div>${formattedOutput}</div>`;
                    });
                return;
            }
            else if (inputValue.toLowerCase().startsWith("show user ")) {
                const userId = inputValue.split(" ")[2];
                fetch(`https://terminal.princewilldev.com/api/show/${userId}`)
                    .then(response => response.json())
                    .then(data => {
                        outputElem.removeChild(processingElem); // Remove processing message
                        inputElem.value = ''; // Clear the input

                        let formattedOutput = '';
                        if (data.status === 200 && data.member) {
                            const member = data.member;
                            formattedOutput += `<div>member ID: ${member.id}</div>`;
                            formattedOutput += `<div>fullname: ${member.name}</div>`;
                            formattedOutput += `<div>email: ${member.email}</div>`;
                            formattedOutput += `<div>Phone: ${member.phone}</div>`;
                            let creationDate = new Date(member.created_at);
                            formattedOutput += `<div>Created on: ${creationDate.toLocaleDateString()} at ${creationDate.toLocaleTimeString()}</div>`;
                        } else if (data.status === 404) {
                            formattedOutput += `<div>Error: ${data.message}</div>`;
                        }
                        outputElem.innerHTML += `<div>${formattedOutput}</div>`;
                    });
                return;
            }
            else if (inputValue.toLowerCase().trim() === "hello") {
                outputElem.removeChild(processingElem); // Remove processing message
                inputElem.value = ''; // Clear the input
                outputElem.innerHTML += `<div>hi, how are you today</div>`;
            }
            else if (inputValue.toLowerCase().trim() === "rose") {
                outputElem.removeChild(processingElem); // Remove processing message
                inputElem.value = ''; // Clear the input
                outputElem.innerHTML += `<div>Hey my sugar, I love you so so much </div>`;
            }
            else {
                outputElem.removeChild(processingElem); // Remove processing message
                inputElem.value = ''; // Clear the input
                outputElem.innerHTML += `<div>commands: show all users, show user 1, hello</div>`;
            }

            // Auto-scroll to bottom
            outputElem.scrollTop = outputElem.scrollHeight;
        }
    });
});











// const inputElem = document.getElementById('input');
// const outputElem = document.getElementById('output');

// inputElem.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//         const inputValue = inputElem.value;
//         outputElem.innerHTML += `<div>user@macos:~$ ${inputValue}</div>`;

//         if (inputValue.trim().toLowerCase() === "clear") {
//             outputElem.innerHTML = '';
//             inputElem.value = '';
//             return;
//         }

//         if (inputValue.trim().toLowerCase() === "showall") {
//             // Displaying the "processing..." message immediately
//             let processingElem = document.createElement('div');
//             processingElem.innerHTML = "processing...";
//             outputElem.appendChild(processingElem);

//             fetch('https://terminal.princewilldev.com/api/show')
//             .then(response => response.json())
//             .then(data => {
//                 // Remove the "processing..." message
//                 processingElem.remove();

//                 // outputElem.innerHTML += `<div>${JSON.stringify(data)}</div>`;
//                 let formattedOutput = '';
//                 if(data.members && Array.isArray(data.members)) {
//                     data.members.forEach(member => {
//                         formattedOutput += `<div>member ID: ${member.id}</div>`;
//                         formattedOutput += `<div>fullname: ${member.name}</div>`;
//                         formattedOutput += `<div>email: ${member.email}</div>`;
//                         formattedOutput += `<div>Phone: ${member.phone}</div>`;
                        
//                         let creationDate = new Date(member.created_at);
//                         formattedOutput += `<div>Created on: ${creationDate.toLocaleDateString()} at ${creationDate.toLocaleTimeString()}</div>`;
                        
//                         formattedOutput += `<br>`; // Separate each member with a line break
//                     });
//                 }
//                 outputElem.innerHTML += `<div>${formattedOutput}</div>`;


//             })
//             .catch(error => {
//                 // Remove the "processing..." message in case of error as well
//                 processingElem.remove();

//                 outputElem.innerHTML += `<div>Error: ${error.message}</div>`;
//             });
//             inputElem.value = '';
//             return;
//         }

//         // ... Rest of your conditions ...

//         inputElem.value = '';
//         // Auto-scroll to bottom
//         outputElem.scrollTop = outputElem.scrollHeight;
//     }
// });




// inputElem.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//         const inputValue = inputElem.value;
//         outputElem.innerHTML += `<div>user@macos:~$ ${inputValue}</div>`;

//         if (inputValue.trim().toLowerCase() === "clear") {
//             outputElem.innerHTML = ''; // Clear the terminal content
//             inputElem.value = '';
//             return; // Exit the function to prevent further processing
//         } 

//         if (!isNaN(inputValue)) {  // Check if input is a number
//             // Make API call
//             fetch(`https://terminal.princewilldev.com/api/show/${inputValue}`)
//             .then(response => response.json())
//             .then(data => {
//                 outputElem.innerHTML += `<div>Name: ${data.name}</div>`;
//                 outputElem.innerHTML += `<div>Email: ${data.email}</div>`;
//             })
//             .catch(error => {
//                 outputElem.innerHTML += `<div>Error: ${error.message}</div>`;
//             });
//         } else if (inputValue.trim() === "hello") {
//             outputElem.innerHTML += `<div>hi, how are you today</div>`;
//         }

//         inputElem.value = '';
//         // Auto-scroll to bottom
//         outputElem.scrollTop = outputElem.scrollHeight;
//     }
// });

// ... Rest of the script ...

// inputElem.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//         const inputValue = inputElem.value;
//         outputElem.innerHTML += `<div>user@macos:~$ ${inputValue}</div>`;

//         if (inputValue.trim().toLowerCase() === "clear") {
//             outputElem.innerHTML = '';
//             inputElem.value = '';
//             return;
//         }

//         if (inputValue.trim().toLowerCase() === "getuser") {
//             fetch(`/https://terminal.princewilldev.com/api/show/${inputValue.split(' ')[1]}`) // Assumes you type "getuser [id]" in the terminal
//             .then(response => response.json())
//             .then(data => {
//                 outputElem.innerHTML += `<div>${JSON.stringify(data, null, 2)}</div>`;  // Displaying the JSON response
//             })
//             .catch(error => {
//                 outputElem.innerHTML += `<div>Error: ${error.message}</div>`;
//             });
//             inputElem.value = '';
//             return; // Exit the function to prevent further processing
//         }

//         // ... Rest of your conditions ...

//         inputElem.value = '';
//         // Auto-scroll to bottom
//         outputElem.scrollTop = outputElem.scrollHeight;
//     }
// });

