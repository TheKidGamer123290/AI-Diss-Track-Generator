# AI Diss Track Generator

A modern web application that uses AI to generate creative diss tracks based on user prompts.

## Features

- 🤖 AI-powered diss track generation using OpenAI's API
- 🎨 Modern, beautiful UI with gradient effects
- 💾 Local storage for API key (stored securely in browser)
- 📋 Copy to clipboard functionality
- 💾 Download diss tracks as text files
- 📱 Responsive design for mobile and desktop

## Setup

1. **Get an OpenAI API Key**
   - Visit [OpenAI's website](https://platform.openai.com/)
   - Create an account or sign in
   - Navigate to API keys section
   - Create a new API key

2. **Open the Application**
   - Simply open `index.html` in your web browser
   - Or serve it using a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Enter Your API Key**
   - Paste your OpenAI API key in the input field
   - It will be saved locally in your browser for future use

## Usage

1. Enter your OpenAI API key (first time only)
2. Type a prompt describing what you want to diss (e.g., "a lazy roommate", "my competition", "a terrible habit")
3. Click "Generate Diss Track"
4. Copy or download the generated diss track

## Technical Details

- Uses OpenAI's GPT-4o-mini model
- API calls are made directly from the browser
- No backend server required
- API key is stored in browser localStorage (never sent to any server except OpenAI)

## Notes

- You need your own OpenAI API key (usage is subject to OpenAI's pricing)
- The app requires an internet connection to call OpenAI's API
- Rate limits are determined by your OpenAI account limits


