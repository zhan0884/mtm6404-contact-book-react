# Contact Book React Application

A modern, responsive contact book web application built with React, React Router, and Firebase Firestore.

## Features

- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Search Functionality**: Filter contacts by first name or last name
- 📋 **Contact Management**: Add, edit, view, and delete contacts
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔄 **Real-time Database**: All data stored in Firebase Firestore
- 📊 **Alphabetical Sorting**: Contacts displayed alphabetically by last name

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google account for Firebase

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npm install react-router-dom firebase
   ```

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Enter a project name and follow the setup wizard

2. **Enable Firestore Database**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location for your database

3. **Get Firebase Configuration**
   - In your Firebase project, go to "Project settings" (gear icon)
   - Scroll down to "Your apps" section
   - Click "Add app" and select "Web"
   - Register your app and copy the configuration object

4. **Update Firebase Configuration**
   - Open `src/db.js`
   - Replace the placeholder configuration with your actual Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Populate Database with Sample Data**
   - In Firebase Console, go to "Firestore Database"
   - Create a collection named `contacts`
   - Add documents with the following structure:
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john.doe@example.com",
     "phone": "+1-555-0123",
     "address": "123 Main St, City, State",
     "company": "Tech Corp",
     "notes": "Software developer"
   }
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to the URL shown in the terminal (usually `http://localhost:5173`)
   - The application should now be running!

## Application Structure

```
src/
├── components/
│   ├── ContactList.jsx      # Main contact list view with search
│   ├── ContactDetail.jsx    # Individual contact details view
│   └── ContactForm.jsx      # Add/edit contact form
├── App.jsx                  # Main app component with routing
├── App.css                  # Styles for the application
├── db.js                    # Firebase configuration
└── main.jsx                 # Application entry point
```

## Routes

- `/` - Contact list (home page)
- `/contact/:id` - Contact details view
- `/add` - Add new contact form
- `/edit/:id` - Edit existing contact form

## Features in Detail

### Contact List View
- Displays all contacts in a responsive grid
- Contacts sorted alphabetically by last name
- Search box to filter contacts by name
- "Add New Contact" button
- Click on any contact to view details

### Contact Detail View
- Shows all contact information
- Edit and Delete buttons
- Back to contacts navigation
- Confirmation dialog for deletion

### Contact Form
- Used for both adding and editing contacts
- Form validation for required fields (firstName, lastName, email)
- Responsive design with proper input types
- Cancel and Save buttons

## Styling

The application uses modern CSS with:
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Smooth transitions and hover effects
- Mobile-first responsive design
- Beautiful gradient backgrounds

## Troubleshooting

### Common Issues

1. **Firebase connection errors**
   - Ensure your Firebase configuration is correct in `src/db.js`
   - Check that Firestore is enabled in your Firebase project
   - Verify your Firebase project is in the correct region

2. **CORS errors**
   - Make sure your Firebase project allows your domain
   - For development, localhost should work by default

3. **Database permission errors**
   - Check your Firestore security rules
   - For development, you can use test mode

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure all dependencies are installed correctly

## Technologies Used

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Firebase Firestore** - NoSQL database
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern features

## License

This project is for educational purposes.