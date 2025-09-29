# Hi, and welcome to the Huayoo APP 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requirements when running locally

1. Add a `.env` file in the root directory
2. [Ngrok](https://ngrok.com/download/windows) is required when running locally - backend running locally on computer and app running with expo go on iOS device. Used to set up a network tunnel allowing app to make requests to backend services running on computer. Install and generate an [auth token](https://dashboard.ngrok.com/get-started/setup/windows).
3. Clone the backend services [Huayoo-orchestrator](https://github.com/Leikisdev/HuaYoo-orchestrator) and [HuaYooORM](https://github.com/Leikisdev/HuaYooORM) and fulfill their requirements.
4. Install Expo Go app on your iOS device.

## Get started (running locally)

1. Install dependencies

   ```bash
   npm install
   ```
2. Start `Huayoo-Orchestrator` and `HuaYooORM` backend services
3. Start the app

   ```bash
   bash run-with-ngrok.sh
   ```
