FROM node:16

#to copy app dependancies
#ensuring both package.json and package-lock.json are copied
COPY package*.json ./


#installing the dependancies
RUN npm install

#copying all the source files
COPY . .

#building the production app
RUN npm run build

#binding the port to app to have it mapped by docker
EXPOSE 3000

# to start the server from production
CMD [ "node", "dist/main.js"]