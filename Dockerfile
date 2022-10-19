# pull official base image
FROM telkomindonesia/debian-buster:nodejs-16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
ENV REACT_APP_BASE_URL = http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/

# add app
COPY . ./

# start app
CMD ["npm", "start"]