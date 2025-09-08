# Step 1: Start with an official Node.js image.
# Using Alpine Linux for a smaller image size.
FROM node:18-alpine

# Step 2: Create a directory inside the container to hold the app code.
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json first.
# This leverages Docker's layer caching. It will only re-run `npm install` if these files change.
COPY package*.json ./

# Step 4: Install the application's dependencies.
RUN npm install

# Step 5: Copy the rest of your application's source code into the container.
COPY . .

# Step 6: Expose the port your app runs on.
# Make sure this matches the port in your server.js (e.g., 3000)
EXPOSE 3000

# Step 7: Define the command to run your app when the container starts.
CMD [ "npm", "start" ]

