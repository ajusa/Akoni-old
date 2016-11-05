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
            this._super(p, { asset: "player.png", x: 50, y: 50,  stepDistance: 64, stepDelay: .3, fireDelay:1, d:0 }); //fireDelay in seconds
            this.add('2d, stepControls');
            this.on("touch");
        },
        touch: function(touch) {
            console.log("Hello")
        },
        step: function(dt) {
            if (Q.inputs['fire'] && this.p.d>this.p.fireDelay) {
                console.log("help") //code on fire
                this.p.d = 0;
            }
            this.p.d += dt;
        },
    });


    Q.scene("level1", function(stage) {
        Q.stageTMX("sample_map.tmx", stage);
        var player = stage.insert(new Q.Player());
        stage.add("viewport").follow(player);

    });

    Q.loadTMX("sample_map.tmx, player.png", function() {
        Q.stageScene("level1");
    });
})
