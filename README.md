## Description

This project is a port of the pixi examples (http://pixijs.github.io/examples/) to run on pxscene.  This involves the primary modifications for pixi.js and pxscene found here:

https://github.com/topcoderinc/pxPixi

## Prerequisites
- Node.js v6.5+ with npm (https://nodejs.org)

## Configuration
You can configure PORT and other settings in config.js file.

* ASSET_URL is the path to the server holding the updated pixi sources with the pxscene modifications.  Each example has this URL set in it.

## Local Deployment
- Install dependencies `npm i`
- Start app `npm start`
- Open one of the .js files in pxscene, like "http://localhost:3000/basic.js"

## Heroku deployment
```
git init
git add .
git commit -m "init"
heroku create
git push heroku master
```
