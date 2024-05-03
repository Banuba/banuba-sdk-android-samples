const am = bnb.scene.getAssetManager();

class Background{
    constructor(){
        this.settings = {
            "bg_texture": "images/null_image.png",
            "bg_aspect": "fill",
            "bg_rotation": 0.0,
            "fg_texture": "images/null_image.png",
            "fg_blending": "alpha",
            "fg_aspect": "fill",
            "fg_rotation": 0.0,
            "lut_texture": "images/null_lut.png",
            "lut_strength": 0.0,
            "position": "0., -130.",
            "scale": 0.89,
            "lights":{
                "radiance":[
                    "1.00, 1.00, 1.00, 0.2",
                    "1.00, 1.00, 1.00, 0.2",
                    "1.00, 1.00, 1.00, 0.8",
                    "1.00, 1.00, 1.00, 1.0"
                ],
                "lights":[
                    "110.0, 70.0, -160.0",
                    "-110.0, 20.0, -180.0",
                    "0.0, 200.0, -50.0",
                    "0.0, 60.0, 300.0"
                ]
            }
        }

        this.states = {
            "default":{
                "bg_texture": "images/backgrounds/BG_default.png",
                "bg_aspect": "fit",
                "bg_rotation": 0.0,
                "fg_texture": "images/null_image.png",
                "fg_blending": "alpha",
                "fg_aspect": "fill",
                "fg_rotation": 0.0,
                "lut_texture": "images/null_lut.png",
                "lut_strength": 0.0,
                "position": "0., -130.",
                "scale": 0.89,
                "lights":{
                    "radiance":[
                        "1.00, 1.00, 1.00, 0.2",
                        "1.00, 1.00, 1.00, 0.2",
                        "1.00, 1.00, 1.00, 0.8",
                        "1.00, 1.00, 1.00, 1.0"
                    ],
                    "lights":[
                        "110.0, 70.0, -160.0",
                        "-110.0, 20.0, -180.0",
                        "0.0, 200.0, -50.0",
                        "0.0, 60.0, 300.0"
                    ]
                }
            },
            "beach": {
                "bg_texture": "images/backgrounds/BG_beach.jpg",
                "bg_aspect": "fill",
                "bg_rotation": 0.0,
                "fg_texture": "images/backgrounds/FG_beach.png",
                "fg_blending": "alpha", 
                "fg_aspect": "fill",
                "fg_rotation": 0.0,
                "lut_texture": "images/backgrounds/lut_beach.png",
                "lut_strength": 1.0,
                "position": "0.0, -80.0",
                "scale": 0.75,
                "lights":{
                    "radiance":[
                        "0.37, 0.70, 0.59, 0.25",
                        "0.47, 0.54, 0.34, 0.25",
                        "0.31, 0.59, 0.70, 0.8",
                        "0.96, 0.86, 0.63, 1.5"
                    ],
                    "lights":[
                        "110.0, 70.0, -160.0",
                        "-110.0, 20.0, -180.0",
                        "0.0, 200.0, -50.0",
                        "0.0, 60.0, 300.0"
                    ]
                },
            },
            "kitchen": {
                "bg_texture": "images/backgrounds/BG_kitchen.jpg",
                "bg_aspect": "fill",
                "bg_rotation": 0.0,
                "fg_texture": "images/backgrounds/FG_kitchen.png",
                "fg_blending": "alpha", 
                "fg_aspect": "fill",
                "fg_rotation": 0.0,
                "lut_texture": "images/backgrounds/lut_kitchen.png",
                "lut_strength": 1.0,
                "position": "0.0, -90.0",
                "scale": 0.75,
                "lights":{
                    "radiance":[
                        "1.00, 0.79, 0.73, 0.3",
                        "1.00, 0.70, 0.65, 0.3",
                        "1.00, 0.80, 0.59, 0.8",
                        "1.00, 0.76, 0.67, 1.1"
                    ],
                    "lights":[
                        "110.0, 70.0, -160.0",
                        "-110.0, 20.0, -180.0",
                        "0.0, 200.0, -50.0",
                        "0.0, 60.0, 300.0"
                    ]
                }
            },
            "christmas": {
                "bg_texture": "images/backgrounds/BG_christmas.jpg",
                "bg_aspect": "fill",
                "bg_rotation": 0.0,
                "fg_texture": "images/backgrounds/FG_christmas.png",
                "fg_blending": "alpha", 
                "fg_aspect": "fill",
                "fg_rotation": 0.0,
                "lut_texture": "images/backgrounds/lut_christmas.png",
                "lut_strength": 1.0,
                "position": "0.0, -90.0",
                "scale": 0.75,
                "lights":{
                    "radiance":[
                        "0.66, 0.41, 0.34, 0.25",
                        "0.69, 0.64, 0.42, 0.3",
                        "0.90, 0.67, 0.60, 0.60",
                        "1.00, 1.00, 1.00, 1.00"
                    ],
                    "lights":[
                        "110.0, 70.0, -160.0",
                        "-110.0, 20.0, -180.0",
                        "0.0, 200.0, -50.0",
                        "0.0, 60.0, 300.0"
                    ]
                }
            }
        }
        this.background_aspect = am.findMaterial("unused").findParameter("background_aspect_rotation");
        this.background = bnb.scene.getRoot().findChildByName("Background").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.background_texture = am.findImage("background").asTexture();
        this.background.setVisible(false);

        this.foreground_mode_aspect = am.findMaterial("unused").findParameter("foreground_mode_aspect_rotation");
        this.foreground = bnb.scene.getRoot().findChildByName("Foreground").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.foreground_texture = am.findImage("foreground").asTexture();
        this.foreground.setVisible(false);

        this.lut_strength = am.findMaterial("unused").findParameter("lut_strength");
        this.lut = bnb.scene.getRoot().findChildByName("Lut").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.lut_texture = am.findImage("lut_image").asWeightedLut();
        this.lut.setVisible(false);

        this.position_scale = am.findMaterial("unused").findParameter("position_scale");
        this.position = bnb.scene.getRoot().findChildByName("Body").getComponent(bnb.ComponentType.TRANSFORMATION).asTransformation()
        this.sc = this.position.getScale();

        this.radiance = [
            am.findMaterial("unused").findParameter("radiance_1"),
            am.findMaterial("unused").findParameter("radiance_2"),
            am.findMaterial("unused").findParameter("radiance_3"),
            am.findMaterial("unused").findParameter("radiance_4"),
        ]

        this.lights = [
            am.findMaterial("unused").findParameter("lights_1"),
            am.findMaterial("unused").findParameter("lights_2"),
            am.findMaterial("unused").findParameter("lights_3"),
            am.findMaterial("unused").findParameter("lights_4"),
        ]

        

        this.clear()
    }

    bg_parameters(texture, aspect, rotation){
        let an = 1.;

        if(texture != undefined){
            this.background_texture.load(texture)
            this.background.setVisible(true)
        }
        if(aspect != undefined){
            const a = aspect.toLowerCase();

            switch(a){
                case "scale_to_fit":
                    an = 0.0;
                    break;
                case "fill":
                    an = 1.0;
                    break;
                case "fit":
                    an = 2.0;
                    break;
                default:
                    an = 1.0;
                    break;
            }
        }
        this.background_aspect.setVector4(new bnb.Vec4(an,rotation ? rotation : 0.0, 0., 0.))
    }

    fg_parameters(texture, blending, aspect, rotation){

        let mn = 9.;
        let an = 1.;

        if(texture != undefined){
            this.foreground_texture.load(texture)
            this.foreground.setVisible(true)
        }
        if(aspect != undefined){
            const a = aspect.toLowerCase();

            switch(a){
                case "scale_to_fit":
                    an = 0.0;
                    break;
                case "fill":
                    an = 1.0;
                    break;
                case "fit":
                    an = 2.0;
                    break;
                default:
                    an = 1.0;
                    break;
            }
        }
        if(blending != undefined){
            const m = blending.toLowerCase();
            switch(m){
                case "normal":
                    mn = 0.0;
                    break;
                case "multiply":
                    mn = 1.0;
                    break;
                case "screen":
                    mn = 2.0;
                    break;
                case "overlay":
                    mn = 3.0;
                    break;
                case "softlight":
                    mn = 4.0;
                    break;
                case "hardlight":
                    mn = 5.0;
                    break;
                case "add":
                    mn = 6.0;
                    break;
                case "lighten":
                    mn = 7.0;
                    break;
                case "colordodge":
                    mn = 8.0;
                    break;
                case "alpha":
                    mn = 9.0;
                    break;
            }
        }

        this.foreground_mode_aspect.setVector4(new bnb.Vec4(mn,an, rotation ? rotation : 0.0, 0.))
    }

    lut_parameters(texture, strength){
        if(texture != undefined){
            this.lut_texture.load(texture)
            this.lut.setVisible(true)
        }
        
        this.lut_strength.setVector4(new bnb.Vec4(strength,0., 0., 0.));
    }

    lights_parameters({radiance, lights}){
        for(let i = 0; i < this.radiance.length; i++){
            if(radiance[i] != undefined){
                const [x,y,z,w] = radiance[i].split(',');
                this.radiance[i].setVector4(new bnb.Vec4(x*w,y*w,z*w,0.0));
            } else{
                this.radiance[i].setVector4(new bnb.Vec4(0,0,0,0));
            }
            if(lights[i] != undefined){
                const [x,y,z] = lights[i].split(',');
                this.lights[i].setVector4(new bnb.Vec4(x,y,z,0.0));
            } else{
                this.lights[i].setVector4(new bnb.Vec4(0,0,0,0));
            }
        }
    }

    transform_parameters(position, scale){
        const [x,y] = position.split(',')
        this.position_scale.setVector4(new bnb.Vec4(x,y,0.0,scale))
        this.position.setScale(new bnb.Vec3(this.sc.x*scale,this.sc.y*scale,this.sc.z*scale))
    }

    state({bg_texture, bg_aspect, bg_rotation,
    fg_texture, fg_blending, fg_aspect, fg_rotation,
    lut_texture, lut_strength,
    position, scale, lights }){
        this.bg_parameters(bg_texture, bg_aspect, bg_rotation)
        this.fg_parameters(fg_texture, fg_blending, fg_aspect, fg_rotation)
        this.lut_parameters(lut_texture, lut_strength)
        this.transform_parameters(position, scale)
        this.lights_parameters(lights)
    }

    parameters({set}){
        set && this.state(this.states[set])
    }

    clear(){
        this.state(this.settings)
        this.background.setVisible(false);
        this.foreground.setVisible(false);
        this.lut.setVisible(false);
    }
}

exports.Background = Background;