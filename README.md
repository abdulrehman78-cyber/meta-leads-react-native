# Meta Leads Real-Time App

This is a full-stack project that automatically catches leads from Facebook/Instagram ads and displays them instantly on a mobile app screen. It uses an **Express backend**, **Firebase Firestore** as the database, and a **React Native (Expo)** app for the frontend.

---

## How the Data Flows

* **Meta Ad Form:** A user fills out an ad on Facebook. Meta instantly fires a `POST` request to our server.
* **Ngrok Tunnel:** Meta can't see your local laptop, so Ngrok bridges the gap and passes the request safely to your machine.
* **Express Server:** Our server checks the password token, reads the JSON data, and uploads it to Firebase.
* **Firebase Database:** Data is stored safely in a cloud collection folder called `leads`.
* **React Native App:** The mobile app has a live event listener (`onSnapshot`) listening to Firebase. The moment data drops in, the phone screen refreshes automatically.

---

## How to Setup and Run It

### Backend Setup
1. Open your terminal and go into the server folder:
   ```bash
   cd server
   ```
2. Create a file named `.env` and add your secret password token:
   ```text
   MY_SECRET_TOKEN=myassignmentsecret123
   PORT=3000
   ```
3. Drop your downloaded Firebase `serviceAccountKey.json` file straight into this `server/` folder. 

4. Install the required Node packages:
   ```bash
   npm install
   ```
5. Start your server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Open a new terminal window and go into the app folder:
   ```bash
   cd app
   ```
2. Install the mobile dependencies:
   ```bash
   npm install
   ```
3. Start the local app bundler our expo:
   ```bash
   npx expo start
   ```
4. Open the **Expo Go** app on your physical phone and scan the QR code to open the screen.

---

## The Local Testing Trick

You don't need a live Facebook ad campaign to test this system:

1. Keep your React Native app open on your phone screen.
2. Open your web browser on your computer and go to:
   ```text
   http://localhost:3000/test-lead
   ```

This will trigger a fake lead injection block. The backend will drop a test user straight into Firestore, and because of the live socket connection, you will see the name pop up on your phone instantly without any manual refreshing!
