# **Slap Af**

A simple meditation app for playing relaxing sounds, guiding breathing exercises, and integrating with Spotify playlists.

---

## **Setup**

### 1. Environment Variables
Copy the `.env.example` file to a new file named `.env` and fill in your credentials:
```bash
cp .env.example .env
```

You'll need to add:
- Firebase configuration (from your Firebase Console)
- Spotify API credentials (from your Spotify Developer Dashboard)

### 2. Run the App
```bash
npm install
npm start
```

### 3. Security Notes
- Never commit the `.env` file
- Keep your API keys and secrets private
- Use environment variables for all sensitive data

---
