#!/bin/bash
ngrok http 8000 > /dev/null &

# Give ngrok a moment to start and establish the tunnel
sleep 5

# Retrieve the ngrok public URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -oP '(?<="public_url":")[^"]*')

ENV_FILE=".env"
VAR_NAME="EXPO_PUBLIC_ORCHESTRATOR_URL"

# If variable exists, replace; else append
if grep -q "^$VAR_NAME=" "$ENV_FILE"; then
  sed -i "s|^$VAR_NAME=.*|$VAR_NAME=$NGROK_URL|" "$ENV_FILE"
else
  echo "$VAR_NAME=$NGROK_URL" >> "$ENV_FILE"
fi

echo "ngrok tunnel started. $VAR_NAME set to $NGROK_URL in $ENV_FILE"

echo "Starting expo app in tunneling mode"
export EXPO_PUBLIC_ENV=development
npx expo start --tunnel