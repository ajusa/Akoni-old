var Q;
//fireDelay should be a component, so that we can have enemies use it as well
window.addEventListener('load', function(e) {
    Q = Quintus()
        .include("Sprites, Scenes, Input, Anim, 2D, Touch, UI, TMX")
        .setup({ maximize: true })
        .controls();
    Q.input.keyboardControls({
        65: "left",
        68: "right",
        87: "up",
        83: "down"
    });
    Q.gravityY = 0;
    Q.touch(Q.SPRITE_ALL);
    Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, { sheet: "chars", frame: 0, x: 12*64+32, y: 12*64+32, stepDistance: 64, stepDelay: .3, fireDelay: 1, d: 0 }); //fireDelay in seconds
            this.add('2d, stepControls');
            this.on("touch");
        },
        touch: function(touch) {
            console.log("Hello")
        },
        step: function(dt) {
            if (Q.inputs['fire'] && this.p.d > this.p.fireDelay) {
                console.log("help") //code on fire
                this.p.d = 0;
            }
            this.p.d += dt;
        },
    });
    Q.Sprite.extend("Projectile", {
        init: function(p) {
            this._super(p, { asset: "player.png", x: 32, y: 32, }); //fireDelay in seconds
            this.add('2d');
        },
        step: function(dt) {
            if (Q.inputs['fire'] && this.p.d > this.p.fireDelay) {
                console.log("help") //code on fire
                this.p.d = 0;
            }
            this.p.d += dt;
        },
    });


    Q.scene("level1", function(stage) {
        Q.stageTMX("testmap.tmx", stage);
        var player = stage.insert(new Q.Player());
        stage.add("viewport").follow(player);

    });

    Q.loadTMX("testmap.tmx, player.png, roguelikeChar_transparent.png", function() {
        Q.sheet("chars",
            "roguelikeChar_transparent.png", {
                tilew: 64, // Each tile is 40 pixels wide
                tileh: 64, // and 40 pixels tall
                spacingX: 4,
                spacingY: 4,
                sx: 0, // start the sprites at x=0
                sy: 748 // and y=0
            });
        Q.stageScene("level1");
    });
})
