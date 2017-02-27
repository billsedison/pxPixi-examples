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

### Basic examples:

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

### Demos:

- Animated Sprite: http://pxscene-pixi-examples.herokuapp.com/demos/animatedsprite-demo.js
- Alpha Mask:  http://pxscene-pixi-examples.herokuapp.com/demos/alpha-mask.js
- Particle Container:  http://pxscene-pixi-examples.herokuapp.com/demos/batch.js
- Blend Modes:  http://pxscene-pixi-examples.herokuapp.com/demos/blendmodes.js
- Cache as Bitmap: http://pxscene-pixi-examples.herokuapp.com/demos/cacheAsBitmap.js
- Dragging: http://pxscene-pixi-examples.herokuapp.com/demos/dragging.js
- Graphics: http://pxscene-pixi-examples.herokuapp.com/demos/graphics-demo.js
- Interactivity: http://pxscene-pixi-examples.herokuapp.com/demos/interactivity.js
- Render Texture: http://pxscene-pixi-examples.herokuapp.com/demos/render-texture-demo.js
- Text: http://pxscene-pixi-examples.herokuapp.com/demos/text-demo.js
- Texture Rotate: http://pxscene-pixi-examples.herokuapp.com/demos/texture-rotate.js
- Texture Swap: http://pxscene-pixi-examples.herokuapp.com/demos/texture-swap.js
- Tinting: http://pxscene-pixi-examples.herokuapp.com/demos/tinting.js
- Transparent Background: http://pxscene-pixi-examples.herokuapp.com/demos/transparent-background.js

### Demo limitations:

Note: due to the limit of pxscene, some of the examples cannot be implemented as same as the original one in pixi.js on browsers without modifying the code of pxscene. I listed the reason as below.

1. Text:
    - Bitmap font is not rendered. PXScene doesn't support bitmap font For rendering bitmap font, I have to parse the given XML and each character needs a whole texture, which is cumbersome and inefficient.
1. Render Texture:
    - since the render texture in pxscene-pixi is implemented by the clone of the node structure, not
      a real texture. So for rendering a **render texture**, pxscene-pixi needs to iterate over the entire node structure and render each node, it is really time consuming.

    - And also attention that, in this example, the statement
       ```
       app.renderer.render(app.stage, renderTexture2, false)
       ```
      always render the entire scene to the render texture. So for pxscene-pixi, the render texture will add the entire node structure as its own children in each tick. The # of nodes in the node structure will grow up exponentially (2^N, N is the render time). And the render will be extremely slow and the pxscene app will be stuck or crash eventually.

      So for prevent the app from stuck or crash, I raise a variable to limit the number of rendering.
      ```
      var maxNumRenderingTicks = 7;
      ```

    - WARNING: you may still be stuck if the performance of your PC/mac is not such good.

1. BlendModes:
    - Pxscene doesn't provide any way to set blend modes, so I could only use alpha to mimic this one. The result is not exactly same.

1. Tinting:
    - Pxscene doesn't provide any way to tint. So I have to use a mask with calculated tint color to mimic it. The result is not same because the texture of the image will be overlapped by the tint color mask.

1. Graphics:
    Pxscene only provides the way to draw a rectangle. So I have to use some tricks to implement other primitives in graphics example:
    - Curves and polygons. I could implement `moveTo` and `lineTo` function of pixi.js by the rectangle, just to make it thin and long and rotated. So a curve or polygon is composed of several lines. These lines are separate render targets for pxscene, so there is no way to fill the polygons. Additionally, these lines are rectangles, so the vertices of the curves/polygons may be overlapped.
    - Circle: I implement the circle by a circle image. So there is no way to stroke it because we cannot stroke an image in pxscene.

1. Particle Container:
    Only render 100 sprites because the environment is not WebGL. If you attempt to render 10000 sprites, it will be extremely slow.

1. Strip:
    This feature should be based on the custom shader. However, pxscene doesn't provide any method to set custom OpenGL shader. So I skip it.

1. Texture Rotate:
    Pxscene doesn't provide any way to rotate texture as rotate = 1, 3, 5, 7, 9, 11, 13, 15. It looks like a UV stretch. So I could only implement rotate = 2, 4, 6, 8, 10, 12, 14.

1. Alpha Mask:
    Pxscene doesn't provide any way to blend mask. So the mask sprite is still colored. The result is not exactly same.

1. Interactivity & Texture Swap:
    These two examples both need texture swap. If you run the example on heroku, you may need to wait several time for the swapped texture downloading. For example, in the Interactivity example, if you move your mouse cursor over a buttonn, the texture will be swapped but you need to wait several seconds to download it complete. During the waiting time, you may see nothing or the button is blinking. However, once the texture is downloaded, it won't be downloaded again and everything goes way. Also, the first time you click the button, please long press the button until the texture appears.

    It could be resolved by pre-loadding image resources, but that may complicate the demo too much.

1. Strip:
    There is no way to implement stripped textured mesh like a snake if we don't extend the pxscene. Because the snake textured mesh is not simple stretching the image texture. Instead, it is implemented by GPU shader (by changing vertices). However, currently, pxscene doesn't provide any way to achieve it.
