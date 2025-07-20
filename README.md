Login and Registration System
A simple HTML-based login and registration system with Node.js backend and SQLite database.

Files Created
HTML Pages
main-index.html - Welcome page with navigation to login/signup

signup.html - User registration form

login.html - User login form

Backend
server.js - Node.js Express server with database integration

package.json - Node.js project configuration and dependencies

js-main-enhanced.js - Enhanced JavaScript for form handling

Prerequisites
Before running this system, you need to install Node.js on your computer:

Visit nodejs.org

Download the LTS version (recommended)

Run the installer and follow the setup instructions

Restart your terminal/command prompt after installation

Setup Instructions
1. Install Dependencies
Once Node.js is installed, open your terminal in the project folder and run:

bash
npm install
This will install all required packages:

express (web server)

sqlite3 (database)

body-parser (form data handling)

cors (cross-origin requests)

2. Start the Server
bash
npm start
Or alternatively:

bash
node server.js
You should see:

text
Connected to SQLite database.
Users table ready.
Server running on http://localhost:3000
3. Access the Application
Open your web browser and go to:

http://localhost:3000 - Main welcome page

http://localhost:3000/signup.html - Registration page

http://localhost:3000/login.html - Login page

Features
Registration System
User name, email, and password collection

Password confirmation validation

Terms of service agreement checkbox

Email uniqueness validation

Automatic redirect to login after successful registration

Login System
Username/email and password authentication

Remember me option

Social login buttons (Facebook, Twitter, Google) - for display only

Automatic redirect after successful login

Database
SQLite database (users.db) created automatically

Stores user information securely

Unique email constraint

Automatic table creation

Navigation
Seamless navigation between forms

Clean welcome page with call-to-action buttons

Responsive design for mobile devices

API Endpoints
GET / - Serves the main welcome page

POST /register - Handle user registration

POST /login - Handle user authentication

GET /users - View all registered users (for testing)

File Structure
text
project-folder/
├── main-index.html          # Welcome page
├── signup.html              # Registration form
├── login.html               # Login form
├── server.js                # Backend server
├── package.json             # Node.js configuration
├── js-main-enhanced.js      # Enhanced form handling
├── users.db                 # SQLite database (created automatically)
├── css/                     # Your CSS files
├── js/                      # Your existing JavaScript files
├── images/                  # Your image files
└── fonts/                   # Your font files
Troubleshooting
"npm is not recognized" Error
Install Node.js from the official website

Restart your terminal after installation

Ensure Node.js is added to your system PATH

Database Issues
The SQLite database file will be created automatically

If you encounter database errors, delete users.db and restart the server

Port Already in Use
If port 3000 is busy, change the PORT variable in server.js

Or stop other applications using port 3000

Customization
Styling
Modify css/style.css for form styling

Update the inline CSS in main-index.html for the welcome page

Database Schema
Edit the table creation SQL in server.js to add more fields

Modify the registration/login forms accordingly

Form Validation
Update the validation rules in js-main-enhanced.js

Add server-side validation in server.js

Security Notes
⚠️ Important: This is a basic implementation for learning purposes. For production use, consider:

Password hashing (bcrypt)

Session management

HTTPS encryption

Input sanitization

Rate limiting

CSRF protection

Next Steps
Install Node.js if not already installed

Run npm install to install dependencies

Start the server with npm start

Test the registration and login functionality

Customize the design and features as needed

Support
If you encounter issues:

Make sure Node.js is properly installed

Check that all files are in the correct location

Ensure your firewall isn't blocking port 3000

Review the terminal output for error messages