const am = bnb.scene.getAssetManager();

class EyesShape{
    constructor(){
        this.settings = {
            "shape": "default",
            "color": "default",
            "eyelids": {
                "type": "none",
                "color": "none"
            },
            "shadows":  {
                "type": "none",
                "color": "none"
            },
        }
        this.shapes = {
            "default":{
                "ShapeEyeSizeVertical": 0.0,
                "ShapeEyeSizeHorizontal": 0.0,
                "ShapeEyeRoll": 0.0,
                "ShapeEyePositionVertical": 0.0,
                "ShapeEyePositionHorizontal": 0.0,
            }
        }
    
        this.eyelids_list = {
            "none": "images/null_alpha.jpg",
            "eyelid_01": "images/eyelids/eyelid_01_alpha.jpg",
            "eyelid_02": "images/eyelids/eyelid_02_alpha.jpg",
            "eyelid_03": "images/eyelids/eyelid_03_alpha.jpg"
        }
    
        this.shadows_list = {
            "none": "images/null_alpha.jpg",
            "eyeshadow_01": "images/Eyeshadow/shadow_01_alpha.jpg",
            "eyeshadow_02": "images/Eyeshadow/shadow_01_blurry_alpha.jpg",
            "eyeshadow_03": "images/Eyeshadow/shadow_02_alpha.jpg",
            "eyeshadow_04": "images/Eyeshadow/shadow_02_blurry_alpha.jpg",
            "eyeshadow_05": "images/Eyeshadow/shadow_03_alpha.jpg",
            "eyeshadow_06": "images/Eyeshadow/shadow_03_blurry_alpha.jpg",
            "eyeshadow_07": "images/Eyeshadow/shadow_04_alpha.jpg",
            "eyeshadow_08": "images/Eyeshadow/shadow_04_blurry_alpha.jpg"
        }
    
        this.eyelids_colors = {
            "none": "0., 0., 0., 0."
        }
    
        this.shadows_colors = {
            "none": "0., 0., 0., 0.",
            "color_1": "0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.",
            "color_2": "0.8352941176470589, 0.8352941176470589, 0.8352941176470589, 1.",
            "color_3": "0.3215686274509804, 0.3215686274509804, 0.3215686274509804, 1.",
            "color_4": "0.06274509803921569, 0.06274509803921569, 0.06274509803921569, 1.",
            "color_5": "0.8509803921568627, 0.788235294117647, 0.7686274509803922,1.",
            "color_6": "0.7647058823529411, 0.6274509803921569, 0.5843137254901961, 1.",
            "color_7": "0.6352941176470588, 0.47058823529411764, 0.4235294117647059,1.",
            "color_8": "0.4980392156862745, 0.30196078431372547, 0.24313725490196078,1.",
            "color_9": "0.9294117647058824, 0.7529411764705882, 0.7647058823529411,1.",
            "color_10": "0.8196078431372549, 0.5176470588235295, 0.5333333333333333,1.",
            "color_11": "0.5803921568627451, 0.3686274509803922, 0.3764705882352941,1.",
            "color_12": "0.35294117647058826, 0.0392156862745098, 0.0392156862745098,1.",
            "color_13": "0.7725490196078432, 0.1411764705882353, 0.09411764705882353,1.",
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
    
        this.eyes_colors = {
            "default": "0.06274509803921569, 0.06274509803921569, 0.06274509803921569",
            "color_1": "0.06274509803921569, 0.06274509803921569, 0.06274509803921569",
            "color_2": "0.4980392156862745, 0.27058823529411763, 0.16862745098039217",
            "color_3": "0.13725490196078433, 0.2980392156862745, 0.5882352941176471",
            "color_4": "0.21176470588235294, 0.4470588235294118, 0.2784313725490196",
            "color_5": "0.6235294117647059, 0.6235294117647059, 0.6235294117647059",
            "color_6": "0.6196078431372549, 0.2, 0.17254901960784313",
            "color_7": "0.6196078431372549, 0.22745098039215686, 0.4117647058823529",
            "color_8": "0.47843137254901963, 0.25098039215686274, 0.48627450980392156",
            "color_9": "0.4117647058823529, 0.34509803921568627, 0.5568627450980392",
            "color_10": "0.2901960784313726, 0.34509803921568627, 0.6078431372549019",
            "color_11": "0.23529411764705882, 0.4196078431372549, 0.6470588235294118",
            "color_12": "0.2980392156862745, 0.5294117647058824, 0.5294117647058824",
            "color_13": "0.37254901960784315, 0.5372549019607843, 0.1803921568627451",
            "color_14": "0.5450980392156862, 0.5333333333333333, 0.23529411764705882",
            "color_15": "0.7333333333333333, 0.5294117647058824, 0.25882352941176473",
            "color_16": "0.7215686274509804, 0.3568627450980392, 0.1568627450980392",

        }
    
        this.rdum = am.findMaterial("unused").findParameter("eyes_shape_rdum");
        this.ws = am.findMaterial("unused").findParameter("eyes_shape_ws");
        this.eyelids_color = am.findMaterial("unused").findParameter("eyelids_color");
        this.eyelids_texture = am.findImage("eyelids").asTexture();
        this.shadows_color = am.findMaterial("unused").findParameter("shadows_color");
        this.shadows = am.findImage("shadows").asTexture();
        this.eyes_color = am.findMaterial("unused").findParameter("eyes_color");
    }

    setShape({ShapeEyeSizeVertical, ShapeEyeSizeHorizontal, ShapeEyeRoll, ShapeEyePositionVertical, ShapeEyePositionHorizontal}){
        this.rdum.setVector4(new bnb.Vec4(
            ShapeEyeSizeVertical ? ShapeEyeSizeVertical : 0.0, 
            ShapeEyeSizeHorizontal ? ShapeEyeSizeHorizontal : 0.0, 
            ShapeEyeRoll ? ShapeEyeRoll : 0.0, 
            ShapeEyePositionVertical ? ShapeEyePositionVertical : 0.0))
        this.ws.setVector4(new bnb.Vec4(
            ShapeEyePositionHorizontal ? ShapeEyePositionHorizontal : 0.0, 
            0.0, 
            0.0, 
            0.0))
    }

    setShapePreset(name){
        this.setShape(this.shapes[name])
    }

    setEyelids(params){
        if(params){
            if(params.type){
                if(params.type.charAt(0) == "@"){
                    let path = params.type.substring(1);
                    this.eyelids_texture.load(path)
                }else{
                    this.eyelids_texture.load(this.eyelids_list[params.type])
                }
            }
            if(params.color){
                let c;
                if(params.color.charAt(0) == "@"){
                    c = params.color.substring(1);
                } else {
                    c = this.eyelids_colors[params.color] || this.eyelids_colors["none"];
                }
                const [x,y,z, w] = c.split(',')
                this.eyelids_color.setVector4(new bnb.Vec4(x,y,z,w));
            }
        }
    }

    setShadows(params){
        if(params){
            if(params.type){
                if(params.type.charAt(0) == "@"){
                    let path = params.type.substring(1);
                    this.shadows.load(path)
                }else{
                    this.shadows.load(this.shadows_list[params.type])
                }
            }
            if(params.color){
                let c;
                if(params.color.charAt(0) == "@"){
                    c = params.color.substring(1);
                } else {
                    c = this.shadows_colors[params.color] || this.shadows_colors["none"];
                }
                const [x,y,z, w] = c.split(',')
                this.shadows_color.setVector4(new bnb.Vec4(x,y,z,w));
            }
        }
    }

    setColor(color){
        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.eyes_colors[color] || this.eyes_colors["default"];
        }
        const [x,y,z] = c.split(',');
        this.eyes_color.setVector4(new bnb.Vec4(x,y,z,1.0))
    }

    
    parameters({shape, color, eyelids, shadows}){
        if(typeof(shape) == "string")
            this.setShapePreset(shape);
        else if(typeof(shape) == "object")
            this.setShape(shape);
        color && this.setColor(color)
        eyelids && this.setEyelids(eyelids)
        shadows && this.setShadows(shadows)
    }

    clear(){
        this.parameters(this.settings)
    }
}

exports.EyesShape = EyesShape