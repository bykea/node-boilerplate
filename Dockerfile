FROM node:10.15.0

# set working directory
WORKDIR /myapp

# install node_modules
ADD package.json /myapp/package.json
RUN npm install

# copy codebase to docker codebase
ADD . /myapp