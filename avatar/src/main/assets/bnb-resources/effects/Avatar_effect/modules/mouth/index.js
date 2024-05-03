const am = bnb.scene.getAssetManager();

class Mouth{
    constructor(){
        this.settings = {
            "shape": "default"
        }
    
        this.shapes = {
            "default":{
                "ShapeMouthSizeVertical": 0.0,
                "ShapeMouthSizeHorizontal": 0.0,
                "ShapeMouthPositionVertical": 0.0,
                "ShapeMouthSmile": 0.0,
            }
    
        }
        this.mouth_shape_sv_sh_pv_smile = am.findMaterial("unused").findParameter("mouth_shape_sv_sh_pv_smile");
    }
    
    setShape({ShapeMouthSizeVertical, ShapeMouthSizeHorizontal, ShapeMouthPositionVertical, ShapeMouthSmile}){
        this.mouth_shape_sv_sh_pv_smile.setVector4(new bnb.Vec4(
            ShapeMouthSizeVertical ? ShapeMouthSizeVertical : 0.0, 
            ShapeMouthSizeHorizontal ? ShapeMouthSizeHorizontal : 0.0, 
            ShapeMouthPositionVertical ? ShapeMouthPositionVertical : 0.0,
            ShapeMouthSmile ? ShapeMouthSmile :0.0))
    }

    setShapePreset(name){
        this.setShape(this.shapes[name])
    }

    parameters({shape}){
        if(typeof(shape) == "string")
            this.setShapePreset(shape);
        else if(typeof(shape) == "object")
            this.setShape(shape);
    }

    
    clear(){
        this.parameters(this.settings)
    }
}

exports.Mouth = Mouth