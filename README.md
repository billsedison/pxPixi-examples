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

## Heroku examples

- Basic: http://pxscene-pixi-examples.herokuapp.com/basics/basic.js
- Container: http://pxscene-pixi-examples.herokuapp.com/basics/container.js
- Container Pivot: http://pxscene-pixi-examples.herokuapp.com/basics/container-pivot.js
- Spritesheet Animation: http://pxscene-pixi-examples.herokuapp.com/basics/spritesheet.js
- Click: http://pxscene-pixi-examples.herokuapp.com/basics/click.js
- Tiling Sprite: http://pxscene-pixi-examples.herokuapp.com/basics/tiling-sprite.js
- Text: http://pxscene-pixi-examples.herokuapp.com/basics/text.js
- Textured Mesh: http://pxscene-pixi-examples.herokuapp.com/basics/textured-mesh.js
- Graphics: http://pxscene-pixi-examples.herokuapp.com/basics/graphics.js
- Render Texture: http://pxscene-pixi-examples.herokuapp.com/basics/render-texture.js
