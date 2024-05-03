const am = bnb.scene.getAssetManager();

class Face {
    constructor(){
        this.settings = {
            "shape": "shape_01",
            "makeups": {
                "wrinkles": {
                    "type": "none",
                    "color": "none"
                },
                "freckles":  {
                    "type": "none",
                    "color": "none"
                },
                "moles":  {
                    "type": "none",
                    "color": "none"
                },
                "blush":  {
                    "type": "none",
                    "color": "none"
                },
                "shadows":  {
                    "type": "none",
                    "color": "none"
                },
            },
            "color": "white",
            "gender": "male",
            "lips":{
                "color": "default",
                "type": "matte"
            } 
        }
    
        this.shapes = {
            "shape_01":{
                "round": 0.0,
                "square": 0.0,
                "triangle": 0.0,
                "diamond": 0.0,
                "heart": 0.0,
                "pear": 0.0,
                "rectangular": 0.0,
                "oblong": 0.0,
            },
            "shape_02":{
                "round": 0.8,
            },
            "shape_03":{
                "round": 0.2,
                "triangle": 0.4,
                "diamond": 0.85,
                "pear": 0.3,
                "oblong": 0.35,
            },
            "shape_04":{
                "round": 0.5, 
                "triangle": 0.3, 
                "heart": 0.8, 
                "oblong": 0.2
            },
            "shape_05":{
                "round": -0.2, 
                "square": -0.1, 
                "pear": 0.1, 
                "oblong": 0.5
            },
            "shape_06":{
                "triangle": -0.5, 
                "pear": 0.9, 
                "rectangular": 0.2
            },
            "shape_07":{
                "square": 0.1, 
                "rectangular": 0.8, 
                "oblong": -0.8
            },
            "shape_08":{
                "square": 0.8, 
                "oblong": -0.4
            },
            "shape_09":{
                "triangle": 0.7, 
                "diamond": 0.2, 
                "rectangular": -0.2
            },
            "shape_10":{
                "round": -0.2, 
                "square": -0.9, 
                "triangle": -0.25, 
                "rectangular": 0.1, 
                "oblong": -0.2
            },
            "shape_11":{
                "round": -0.65, 
                "square": 0.4, 
                "triangle": -0.32, 
                "diamond": -0.35, 
                "heart": -0.5, 
                "pear": 0.3, 
                "rectangular": -0.65, 
                "oblong": 0.2
            }
        }
    
        this.colors = {
            "white": "0.93, 0.80, 0.70",
            "afro": "0.47, 0.35, 0.27",
            "asian": "0.795, 0.65, 0.51",
            "indian": "0.70, 0.51, 0.37",
            "latino": "0.76, 0.59, 0.46",
            "color_1": "0.996078431372549, 0.9686274509803922, 0.9647058823529412",
            "color_2": "0.9882352941176471, 0.9333, 0.9215686274509803",
            "color_3": "0.9803921568627451, 0.8941176470588236, 0.8745098039215686",
            "color_4": "0.9686274509803922, 0.8549019607843137, 0.8313725490196079",
            "color_5": "0.9607843137254902, 0.8156862745098039, 0.7843137254901961",
            "color_6": "0.9490196078431372, 0.7764705882352941, 0.7372549019607844",
            "color_7": "0.996078431372549, 0.9764705882352941, 0.9647058823529412",
            "color_8": "0.9921568627450981, 0.9490196078431372, 0.9254901960784314",
            "color_9": "0.984313725490196, 0.9176470588235294, 0.8901960784313725",
            "color_10": "0.9764705882352941, 0.8901960784313725, 0.8509803921568627",
            "color_11": "0.9686274509803922, 0.8588235294117647, 0.8117647058823529",
            "color_12": "0.9568627450980393, 0.8274509803921568, 0.7725490196078432",
            "color_13": "0.9921568627450981, 0.9568627450980393, 0.9294117647058824",
            "color_14": "0.9764705882352941, 0.9215686274509803, 0.8745098039215686",
            "color_15": "0.9607843137254902, 0.8745098039215686, 0.803921568627451",
            "color_16": "0.9411764705882353, 0.8274509803921568, 0.7372549019607844",
            "color_17": "0.9215686274509803, 0.7803921568627451, 0.6705882352941176",
            "color_18": "0.8980392156862745, 0.7294117647058823, 0.596078431372549",
            "color_19": "0.9647058823529412, 0.9058823529411765, 0.8392156862745098",
            "color_20": "0.9450980392156862, 0.8666666666666667, 0.7725490196078432",
            "color_21": "0.9215686274509803, 0.8235294117647058, 0.7058823529411765",
            "color_22": "0.8941176470588236, 0.7843137254901961, 0.6352941176470588",
            "color_23": "0.8745098039215686, 0.7411764705882353, 0.5686274509803921",
            "color_24": "0.8509803921568627, 0.7019607843137254, 0.5019607843137255",
            "color_25": "0.9411764705882353, 0.7803921568627451, 0.6",
            "color_26": "0.8901960784313725, 0.7294117647058823, 0.5450980392156862",
            "color_27": "0.8274509803921568, 0.6313725490196078, 0.45098039215686275",
            "color_28": "0.7019607843137254, 0.49019607843137253, 0.3137254901960784",
            "color_29": "0.596078431372549, 0.3843137254901961, 0.2196078431372549",
            "color_30": "0.42745098039215684, 0.24705882352941178, 0.1411764705882353",
            "color_31": "0.8470588235294118, 0.7803921568627451, 0.7490196078431373",
            "color_32": "0.733333, 0.66666, 0.6392156862745098",
            "color_33": "0.611764705882353, 0.5490196078431373, 0.5254901960784314",
            "color_34": "0.4980392156862745, 0.43529411764705883, 0.4196078431372549",
            "color_35": "0.3803921568627451, 0.3176470588235294, 0.3058823529411765",
            "color_36": "0.25882352941176473, 0.2, 0.19215686274509805",
            "color_37": "0.5294117647058824, 0.3568627450980392, 0.25098039215686274",
            "color_38": "0.47843137254901963, 0.3215686274509804, 0.22745098039215686",
            "color_39": "0.4117647058823529, 0.27058823529411763, 0.18823529411764706",
            "color_40": "0.34509803921568627, 0.21568627450980393, 0.1450980392156863",
            "color_41": "0.2784313725490196, 0.16470588235294117, 0.10196078431372549",
            "color_42": "0.20784313725490197, 0.10980392156862745, 0.058823529411764705",

        }
    
        this.images = {
            "male": {
                "base": "modules/body/male_head_BaseColor.jpg",
                "overlay": "modules/body/male_head_overlay.jpg"
            },
            "female": {
                "base": "modules/body/female_head_BaseColor.jpg",
                "overlay": "modules/body/female_head_overlay.jpg"
            },
            "lips":{
                "none": "images/null_image.png",
                "glitter": "images/null_image.png",
            },
            "makeup":{
                "wrinkles":{
                    "none": "images/null_alpha.jpg",
                    "wrinkles_01": "images/wrinkles/mat_wrinkles_01_alpha.jpg",
                    "wrinkles_02": "images/wrinkles/mat_wrinkles_02_alpha.jpg",
                    "wrinkles_03": "images/wrinkles/mat_wrinkles_03_alpha.jpg"
                },
                "freckles":{
                    "none": "images/null_alpha.jpg",
                    "freckles_01": "images/freckles/mat_freckles_01_alpha.jpg",
                    "freckles_02": "images/freckles/mat_freckles_02_alpha.jpg",
                    "freckles_03": "images/freckles/mat_freckles_03_alpha.jpg",
                },
                "moles":{
                    "none": "images/null_alpha.jpg",
                    "moles_01": "images/moles/mat_moles_01_alpha.jpg",
                    "moles_02": "images/moles/mat_moles_02_alpha.jpg",
                    "moles_03": "images/moles/mat_moles_03_alpha.jpg"
                },
                "blush":{
                    "none": "images/null_alpha.jpg",
                    "blush_01": "images/blush/mat_blush_01_alpha.jpg",
                    "blush_02": "images/blush/mat_blush_01_alpha.jpg",
                    "blush_03": "images/blush/mat_blush_01_alpha.jpg",
                    "blush_04": "images/blush/mat_blush_01_alpha.jpg"
                }
            }
        }
    
        this.makeup_colors = {
            "none": "0., 0., 0., 0.",
            "color_freckles": "0.84, 0.53, 0.46, 1.0",
            "color_moles": "0.22, 0.18, 0.17, 1.0",
            "color_blush": "0.95, 0.62, 0.56, 1.0"
        }

        this.blush_colors = {
            "none":  "0., 0., 0., 0.",
            "default": "0.807843137254902, 0.24705882352941178, 0.24705882352941178, 1.",
            "color_1": "0.807843137254902, 0.24705882352941178, 0.24705882352941178, 1.",
            "color_2": "0.8, 0.34901960784313724, 0.41568627450980394, 1.",
            "color_3": "0.9215686274509803, 0.5215686274509804, 0.5568627450980392, 1.",
            "color_4": "0.7568627450980392, 0.48627450980392156, 0.43529411764705883, 1.",
            "color_5": "0.8117647058823529, 0.5725490196078431, 0.4823529411764706, 1.",
            "color_6": "0.8666666666666667, 0.4980392156862745, 0.45098039215686275, 1.",
            "color_7": "0.7725490196078432, 0.4745098039215686, 0.5372549019607843, 1.",
            "color_8": "0.8666666666666667, 0.7647058823529411, 0.807843137254902, 1.",

        }

        this.lips_colors = {
            "default": "0., 0.0, 0.0, 0.",
            "color_1": "0.9176470588235294, 0.20392156862745098, 0.30980392156862746, 1.",
            "color_2": "0.9294117647058824, 0.7529411764705882, 0.7647058823529411, 1.",
            "color_3": "0.8274509803921568, 0.5058823529411764, 0.6, 1.",
            "color_4": "0.8823529411764706, 0.34901960784313724, 0.5176470588235295, 1.",
            "color_5": "0.8392156862745098, 0.10980392156862745, 0.058823529411764705, 1.",
            "color_6": "0.6509803921568628, 0.0784313725490196, 0.19215686274509805, 1.",
            "color_7": "0.4235294117647059, 0.08627450980392157, 0.07058823529411765, 1.",
            "color_8": "0.06274509803921569, 0.06274509803921569, 0.06274509803921569, 1.",
            "color_9": "0.7176470588235294, 0.43137254901960786, 0.4, 1.",
            "color_10": "0.615686274509804, 0.34901960784313724, 0.37254901960784315, 1.",
            "color_11": "0.5176470588235295, 0.27058823529411763, 0.34509803921568627, 1.",
            "color_12": "0.44313725490196076, 0.19215686274509805, 0.27058823529411763, 1.",
            "color_13": "0.9372549019607843, 0.9372549019607843, 0.9254901960784314, 1.",
            "color_14": "0.7686274509803922, 0.1843137254901961, 0.4588235294117647,1.",
            "color_15": "0.5607843137254902, 0.2196078431372549, 0.5764705882352941,1.",
            "color_16": "0.4588235294117647, 0.3607843137254902, 0.6784313725490196,1.",
            "color_17": "0.27450980392156865, 0.3607843137254902, 0.7529411764705882,1.",
            "color_18": "0.19215686274509805, 0.47058823529411764, 0.8117647058823529,1.",
            "color_19": "0.28627450980392155, 0.6352941176470588, 0.6352941176470588,1.",
            "color_20": "0.3803921568627451, 0.5764705882352941, 0.1568627450980392,1.",
            "color_21": "0.6627450980392157, 0.6431372549019608, 0.19215686274509805,1.",
            "color_22": "0.9450980392156862, 0.6392156862745098, 0.22745098039215686,1.",
            "color_23": "0.8588235294117647, 0.38823529411764707, 0.1607843137254902,1.",
        }
    
        this.rstd = am.findMaterial("unused").findParameter("face_shape_rstd");
        this.hpro = am.findMaterial("unused").findParameter("face_shape_hpro");
    
        this.face_color = am.findMaterial("unused").findParameter("face_color");
        this.lips_color = am.findMaterial("unused").findParameter("lips_color");
        this.lips_mr = am.findMaterial("unused").findParameter("lips_mr");
        this.wrinkles_color = am.findMaterial("unused").findParameter("wrinkles_color");
        this.freckles_color = am.findMaterial("unused").findParameter("freckles_color");
        this.moles_color = am.findMaterial("unused").findParameter("moles_color");
        this.blush_color = am.findMaterial("unused").findParameter("blush_color");
    
        this.gender = am.findMaterial("unused").findParameter("face_gender");
    
        this.base_texture = am.findImage("body_Base").asTexture();
        this.overlay_texture = am.findImage("overlay").asTexture();
        this.wrinkles = am.findImage("wrinkles").asTexture();
        this.freckles = am.findImage("freckles").asTexture();
        this.moles = am.findImage("moles").asTexture();
        this.blush = am.findImage("blush").asTexture();
        this.lips_glitter = am.findImage("lips_glitter").asTexture();
    }


    setShape({round, square, triangle, diamond, heart, pear, rectangular, oblong}){
        this.rstd.setVector4(new bnb.Vec4(
            round ? round : 0.0, 
            square ? square : 0.0, 
            triangle ? triangle : 0.0, 
            diamond ? diamond : 0.0))

        this.hpro.setVector4(new bnb.Vec4(
            heart ? heart : 0.0, 
            pear ? pear : 0.0, 
            rectangular ? rectangular : 0.0,
            oblong ? oblong : 0.0))
    }

    setShapePreset(name){
        this.shapes[name] && this.setShape(this.shapes[name])
    }

    setColor(color){
        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.colors[color] || this.colors["white"];
        }
        const [x,y,z] = c.split(',')
        this.face_color.setVector4(new bnb.Vec4(x,y,z,0.));
    }

    setMakeups({wrinkles,freckles,moles,blush}){
        wrinkles && this.setWrinkles(wrinkles)
        freckles && this.setFreckles(freckles)
        moles && this.setMoles(moles)
        blush && this.setBlush(blush)
    }

    setWrinkles(params){
        if(params){
            if(params.type){
                if(params.type.charAt(0) == "@"){
                    let path = params.type.substring(1);
                    this.wrinkles.load(path)
                }else{
                    this.wrinkles.load(this.images.makeup.wrinkles[params.type])
    
                }
            }
            if(params.color){
                let c;
                if(params.color.charAt(0) == "@"){
                    c = params.color.substring(1);
                } else {
                    c = this.makeup_colors[params.color] || this.makeup_colors["none"];
                }
                const [x,y,z, w] = c.split(',')
                this.wrinkles_color.setVector4(new bnb.Vec4(x,y,z,w));
            }
        }
    }

    setBlush(params){
        if(params){
            if(params.type){
                if(params.type.charAt(0) == "@"){
                    let path = params.type.substring(1);
                    this.blush.load(path)
                }else{
                    this.blush.load(this.images.makeup.blush[params.type])
                }
            }
            if(params.color){
                let c;
                if(params.color.charAt(0) == "@"){
                    c = params.color.substring(1);
                } else {
                    c = this.blush_colors[params.color] || this.blush_colors["default"];
                }
                const [x,y,z, w] = c.split(',')
                this.blush_color.setVector4(new bnb.Vec4(x,y,z,w));
            }
        }
    }

    setMoles(params){
        if(params){
            if(params.type){
                if(params.type.charAt(0) == "@"){
                    let path = params.type.substring(1);
                    this.moles.load(path)
                }else{
                    this.moles.load(this.images.makeup.moles[params.type])
                }
            }
            if(params.color){
                let c;
                if(params.color.charAt(0) == "@"){
                    c = params.color.substring(1);
                } else {
                    c = this.makeup_colors[params.color] || this.makeup_colors["none"];
                }
                const [x,y,z, w] = c.split(',')
                this.moles_color.setVector4(new bnb.Vec4(x,y,z,w));
            }
        }
    }

    setFreckles(params){
        if(params){
            if(params.type.charAt(0) == "@"){
                let path = params.type.substring(1);
                this.freckles.load(path)
            }else{
                this.freckles.load(this.images.makeup.freckles[params.type])

            }
            let c;
            if(params.color.charAt(0) == "@"){
                c = params.color.substring(1);
            } else {
                c = this.makeup_colors[params.color] || this.makeup_colors["none"];
            }
            const [x,y,z, w] = c.split(',')
            this.freckles_color.setVector4(new bnb.Vec4(x,y,z,w));
        }
    }

    setGender(gender){
        if(gender){
            switch(gender){
                case "male":
                    this.base_texture.load(this.images.male.base)
                    this.overlay_texture.load(this.images.male.overlay)
                    this.gender.setVector4(new bnb.Vec4(0.))
                    break;
                case "female":
                    this.base_texture.load(this.images.female.base)
                    this.overlay_texture.load(this.images.female.overlay)
                    this.gender.setVector4(new bnb.Vec4(0.7))
                    break;
            }
        }
    }

    setLipsColor(color){
        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.lips_colors[color] || this.lips_colors["default"];
        }
        const [x,y,z, w] = c.split(',')
        this.lips_color.setVector4(new bnb.Vec4(x,y,z,w));
    }

    setLips({color,metallic,roughness}){
        color && this.setLipsColor(color)
        this.lips_mr.setVector4(new bnb.Vec4(metallic, roughness, 0., 0.));
    }

    lipsParams({color, type}){
        let metallic = 0.0
        let roughness = 0.0

        switch(type){
            case "matte":
                metallic = 0.05
                roughness = 0.35
                this.lips_glitter.load(this.images.lips.none)
                break;
            case "glossy":
                metallic = 1.0
                roughness = 0.0
                this.lips_glitter.load(this.images.lips.none)
                break;
            case "glitter":
                metallic = 1.0
                roughness = 0.0
                this.lips_glitter.load(this.images.lips.glitter)
                break;
        }
        this.setLips({color, metallic, roughness})
    }

    parameters({shape, makeups, color, gender, lips}){
        makeups && this.setMakeups(makeups);
        if(typeof(shape) == "string")
            this.setShapePreset(shape);
        else if(typeof(shape) == "object")
            this.setShape(shape);
        color && this.setColor(color);
        gender && this.setGender(gender)
        lips && this.lipsParams(lips)
    }

    clear(){
        this.parameters(this.settings)
    }
}

exports.Face = Face;