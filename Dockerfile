FROM node:16.16.0

RUN echo "creating working directory..."
RUN mkdir -p /couchgag/website
RUN echo "working dir created!"

WORKDIR /couchgag/website 

RUN echo "copying package.json..."
COPY package.json .
RUN echo "copying of `package.json` complete!"

RUN echo "installing packages..."
RUN yarn install 
RUN echo "package install complete!"

RUN echo "porting over project..."
COPY . .
RUN echo "copied local 'src' dir successfully over to /couchgag/website"

RUN echo "cleaning project build folder..."
RUN yarn clean:build
RUN echo "Sanitized build artifact!"

RUN echo "Building a fresh copy of the app...",
RUN yarn build 
RUN echo "App built!"

ENV PORT 5090
EXPOSE 5090

CMD ["yarn", "start"]