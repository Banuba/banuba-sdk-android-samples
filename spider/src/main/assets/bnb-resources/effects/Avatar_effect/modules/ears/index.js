const am = bnb.scene.getAssetManager();

class Ears{
    constructor(){
        this.settings = {
            "shape": "default",
            "left_earring":{
                "shape": "none",
                "color": "default"
            },
            "right_earring":{
                "shape": "none",
                "color": "default" 
            }
        }
    
        this.shapes = {
            "default":{
                "ShapeEarSizeVertical": 0.0,
                "ShapeEarSizeHorizontal": 0.0,
                "ShapeEarPositionVertical": 0.0,
            }
    
        }

        this.earrings = {
            "none": "",
            "first": "earring_01"
        }
        this.colors ={
            "default": "0., 0., 0., 1."
        }

        this.material_left_earring = am.findMaterial("mat_earring_L");

        this.MI_L = bnb.scene.getRoot().findChildByName("Earring_L").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.Base_L = am.findImage("earrings_L_Base").asTexture();
        this.Normal_L = am.findImage("earrings_L_Normal").asTexture();
        this.left_earring_color = am.findMaterial("unused").findParameter("left_earring_color");

        this.material_right_earring = am.findMaterial("mat_earring_R");

        this.MI_R = bnb.scene.getRoot().findChildByName("Earring_R").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.Base_R = am.findImage("earrings_R_Base").asTexture();
        this.Normal_R = am.findImage("earrings_R_Normal").asTexture();
        this.right_earring_color = am.findMaterial("unused").findParameter("right_earring_color");

        this.ears_shape_sv_sh_pv = am.findMaterial("unused").findParameter("ears_shape_sv_sh_pv");

        this.clear()
    }

    
    setShape({ShapeEarSizeVertical, ShapeEarSizeHorizontal, ShapeEarPositionVertical}){
        this.ears_shape_sv_sh_pv.setVector4(new bnb.Vec4(
            ShapeEarSizeVertical ? ShapeEarSizeVertical : 0.0, 
            ShapeEarSizeHorizontal ? ShapeEarSizeHorizontal : 0.0, 
            ShapeEarPositionVertical ? ShapeEarPositionVertical : 0.0, 
            0.0))
    }

    
    setShapePreset(name){
        this.setShape(this.shapes[name])
    }

    setLeftEarring({shape, color}){
        if(shape == "none"){
            return
        }
        const Mesh = am.findMesh(this.earrings[shape]+"_L")
        this.MI_L.setMesh(Mesh)
        this.MI_L.setSubGeometryMaterial("mat_earring_L", this.material_left_earring)
        this.Base_L.load("modules/ears/images/"+this.earrings[shape]+"_L_Base.png")
        this.Normal_L.load("modules/ears/images/"+this.earrings[shape]+"_L_Normal.png")
        this.MI_L.setVisible(true)

        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.colors[color] || this.colors["default"];
        }
        const [x,y,z] = c.split(',');
        this.left_earring_color.setVector4(new bnb.Vec4(x,y,z,1.0))
    }

    setRightEarring({shape, color}){
        if(shape == "none"){
            return
        }
        const Mesh = am.findMesh(this.earrings[shape]+"_R")
        this.MI_R.setMesh(Mesh)
        this.MI_R.setSubGeometryMaterial("mat_earring_R", this.material_right_earring)
        this.Base_R.load("modules/ears/images/"+this.earrings[shape]+"_R_Base.png")
        this.Normal_R.load("modules/ears/images/"+this.earrings[shape]+"_R_Normal.png")
        this.MI_R.setVisible(true)

        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.colors[color] || this.colors["default"];
        }
        const [x,y,z] = c.split(',');
        this.right_earring_color.setVector4(new bnb.Vec4(x,y,z,1.0))
    }

    parameters({shape, left_earring, right_earring}){
        if(typeof(shape) == "string")
            this.setShapePreset(shape);
        else if(typeof(shape) == "object")
            this.setShape(shape);

        left_earring && this.setLeftEarring(left_earring)
        right_earring && this.setRightEarring(right_earring)
    }

    
    clear(){
        this.parameters(this.settings)
        this.MI_R.setVisible(false)
        this.MI_L.setVisible(false)
    }
}

exports.Ears = Ears