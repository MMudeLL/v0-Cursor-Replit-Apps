# Firebase Setup Instructions

This Todo List App is configured to work with Firebase Firestore for data persistence. Follow these steps to set up Firebase:

## 🚀 Replit Setup (Recommended)

If you're using Replit, the Firebase API Keys should be stored in the **Secrets Tab**:

### Setting up Secrets in Replit:

1. In your Replit project, click on the **Secrets** tab (lock icon) in the left sidebar
2. Add the following secrets with your Firebase configuration values:

```
REPLIT_FIREBASE_API_KEY = your_api_key_here
REPLIT_FIREBASE_AUTH_DOMAIN = your_project_id.firebaseapp.com
REPLIT_FIREBASE_PROJECT_ID = your_project_id
REPLIT_FIREBASE_STORAGE_BUCKET = your_project_id.appspot.com
REPLIT_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
REPLIT_FIREBASE_APP_ID = your_app_id
```

3. The app will automatically use these secrets when running in Replit
4. No need to create a `.env.local` file in Replit

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "todo-app")
4. Follow the setup wizard

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 4. Set Environment Variables

### For Local Development (Non-Replit):

Create a `.env.local` file in the root directory with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### For Replit:

Use the Secrets Tab as described above. The app will automatically detect and use the Replit secrets.

## 5. Install Dependencies

```bash
npm install
```

## 6. Run the Application

```bash
npm run dev
```

## Firestore Security Rules (Optional)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if true; // For development only
    }
  }
}
```

## Features

- ✅ Create new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Real-time data sync with Firebase
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Timestamps for created/updated dates

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that Firestore is enabled in your Firebase project
- Verify your Firebase project ID matches the environment variable
- Check the browser console for any error messages
