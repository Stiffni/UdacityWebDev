# Neighbourhood Map Project

This repo contains all the source code for the Neighbourhood Map app, which I'm working on in order to
achieve the Udacity Web Developer Nanodegree.
This app shows you my favourite restaurants where I live using `Google` Maps, and shows their address and category of food from the `FourSquare` API. This project uses React for these components.

## Getting Started
### Dev Mode
* clone this repo to your machine
* open your terminal window and change location to the root of the cloned directory
* if you don't have nodejs or npm, follow the install instructions [here](https://www.npmjs.com/get-npm)
* install all project dependencies by running `npm install` in your terminal 
* start the development server with `npm start`
* open your browser to [http://localhost:3000/](http://localhost:3000/) if it does not open automatically

### Production Mode
The service worker only runs in production mode, to experience faster load times and offline capabilities,
run these steps in your console to view the web app:
* clone this repo to your machine
* open your terminal window and change location to the root of the cloned directory
* if you don't have nodejs or npm, follow the install instructions [here](https://www.npmjs.com/get-npm)
* install all project dependencies by running `npm install` in your terminal 
* build a production app by typing `npm run build`
* run `npm install -g serve`
* run `serve -s build`
* open your browser to [http://localhost:5000/](http://localhost:5000/) if it does not open automatically