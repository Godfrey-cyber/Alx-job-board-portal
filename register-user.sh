#!/bin/bash

echo "=== User Registration ==="

# Prompt for firstname
read -p "Enter firstname: " firstName

# Prompt for lastname
read -p "Enter lastname: " lastName

# Prompt for email
read -p "Enter email: " email

# Prompt for password (hidden)
read -s -p "Enter password: " password
echo

# Send POST request using curl
response=$(curl -s -w "%{http_code}" -o /tmp/response.json -X POST http://localhost:6000/api/v1/auth/register-user \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"$firstName\", \"lastName\":\"$lastName\", \"email\":\"$email\", \"password\":\"$password\"}")

# Extract response code
http_code=$(tail -n1 <<< "$response")

# Check status
if [ "$http_code" -eq 201 ]; then
  echo "✅ Registration successful!"
else
  echo "❌ Registration failed with status: $http_code"
  echo "Response:"
  cat /tmp/response.json
fi
