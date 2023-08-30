INTRODUCTION
-----------------------
This is a Laravel API project that uses the Laravel's API library Sanctum to authenticate users.

ENDPOINTS
---------------

    1. /api/register
                |
                |------This is the registration endpoint, it takes in 4 parameters: name, email, phone and password.

    2. /api/login
                |
                |------This is the login endpoint, it take in 2 parameters: email and paasword.
    3. /api/logout
                |
                |------This is the logout endpoint, it is protected by middleware['auth:sanctum'], once called the destroys the users session token and logs the user out.