const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com/';
const PIXI_PATH = ASSET_URL + '/pixi/';
const FIGHTER_IMAGE_PATH = ASSET_URL + '/assets/basic/fighter.json';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js',
            fs: 'fs',
            http: 'http',
            url: 'url',
}).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});
  var fs = imports.fs;
  var http = imports.http;
  var url = imports.url;

  PIXI.loader
      .add(FIGHTER_IMAGE_PATH, fs, http, url)
      .load(onAssetsLoaded);

  function onAssetsLoaded(err, data)
  {
      // create an array of textures from an image path
      var frames = [];

      for (var i = 0; i < 30; i++) {
          var val = i < 10 ? '0' + i : i;
  // magically works since the spritesheet was loaded with the pixi loader
          var framesData = data.meta.frames;
          frames.push(framesData['rollSequence00' + val + '.png']);
      }

      // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
      var anim = new PIXI.extras.AnimatedSpriteV8(data.texture, frames);

      /*
       * An AnimatedSprite inherits all the properties of a PIXI sprite
       * so you can change its position, its anchor, mask it, etc
       */
      anim.x = app.renderer.width / 2;
      anim.y = app.renderer.height / 2;
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.5;
      anim.play();

      app.stage.addChild(anim);

      // Animate the rotation
      app.ticker.add(function() {
          anim.rotation += 0.01;
      });
  }

}).catch( function importFailed(err){
  console.error("Import for basic.js failed: ", err)
});
