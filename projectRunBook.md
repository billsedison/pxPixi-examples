# Project Name: [Pxscene / Pixi examples]

## Project Abstract:
  This project is a port of the pixi examples (http://pixijs.github.io/examples/) to run on pxscene.  This involves the primary modifications for pixi.js and pxscene found here:

  https://gitlab.com/hercules-pxscene/pxscene-pixi-js

## Client Details:
  R&D

### Organizational Groups:
 - R&D

### Stakeholders:

### Accounts & Keys
- No keys are necessary to run the app

## Technicals:

### Technologies:
 - node.js
 - pxscene
 - Pixi.js

### Installation Guide:
  See the README.md file

### Dependencies:
- Heroku Account
- Node.js 7.4.0
- Pixi JS (v4), with pxscene modifications

### Target Environment(s):
 - Heroku
 - Updated pixi sources (http://pxscene-pixi-dev.herokuapp.com)

### Source control:
 - App: https://gitlab.com/Hercules-XREReceiver/pixi-xre-receiver
 - Updated pixi:  https://gitlab.com/hercules-pxscene/pxscene-pixi-js
### Configuration

 In each example JS file:

 * ASSET_URL is the path to the server holding the updated pixi sources with the pxscene modifications

### CI/CD:
- pxscene-pixi-examples
  + Basic examples deployed to Heroku
    * Host: Heroku
    * URL:  https://pxscene-pixi-examples.herokuapp.com/
    * CI: Gitlab CI is applied
    * CD: Heroku
