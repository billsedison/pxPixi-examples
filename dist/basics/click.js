const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js' }).then( function ready(imports) {

    var scene = imports.scene;
    var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb, view: scene});

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    var sprite = PIXI.Sprite.fromImage(BUNNY_IMAGE_PATH);

    // Set the initial position
    sprite.anchor.set(0.5);
    sprite.x = app.renderer.width / 2;
    sprite.y = app.renderer.height / 2;

    // Opt-in to interactivity
    sprite.interactive = true;

    // Shows hand cursor
    sprite.buttonMode = true;

    // Pointers normalize touch and mouse
    sprite.on('pointerdown', onClick);

    // Alternatively, use the mouse & touch events:
    // sprite.on('click', onClick); // mouse-only
    // sprite.on('tap', onClick); // touch-only


    app.stage.addChild(sprite);

    function onClick () {
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
    }

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
