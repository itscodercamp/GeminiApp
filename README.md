
# GeminiApp - Interactive Math Problem Solver

GeminiApp is a **React Native** application designed to offer interactive, real-time solutions to math problems using the **Google Gemini API**. This project has a built-in refresh system and follows a clean, modular approach for better maintainability. The development environment is set up with Expo, so you can easily start working with the app by following the simple steps below.

## Getting Started

### Prerequisites

Before starting the development server, ensure you have the following tools installed:

- **Node.js** (v14 or later)
- **Expo CLI** (if not using `npx`)
- **Yarn** (optional, for package management)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/itscodercamp/GeminiApp.git
   cd GeminiApp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

   or, if you're using Yarn:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   expo start
   ```

   Alternatively, you can use:
   ```bash
   npx expo start
   ```

   or

   ```bash
   yarn start
   ```

4. Use the refresh system to see real-time updates as you make changes.

## Integrating the Google Gemini API

This app utilizes **Google Gemini's API** to process math problems and provide interactive solutions. To get started with the API, follow these steps:

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (if you haven't already).
3. Enable the **Gemini API** for your project.
4. Generate an API key from the **APIs & Services > Credentials** section.
5. Add your API key to the project:
   - Open the project in your editor.
   - Locate the `config.js` or appropriate environment file.
   - Paste your API key:
     ```javascript
     const API_KEY = 'YOUR_GOOGLE_GEMINI_API_KEY';
     ```

## Building APK for Android

To build an APK for Android, use the following **EAS (Expo Application Services)** commands:

1. Install the Expo EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Configure your project for EAS builds:
   ```bash
   eas build:configure
   ```

4. Build the APK:
   ```bash
   eas build -p android --profile production
   ```

   After the build completes, you'll receive a link to download your APK.

## Conclusion

This is a **basic project** but incorporates some **great approaches** in React Native app development. It provides a simple but effective solution using the Google Gemini API, making it a practical starting point for more advanced applications.

Feel free to explore the code, modify it, and use it as the foundation for more interactive and dynamic projects.
