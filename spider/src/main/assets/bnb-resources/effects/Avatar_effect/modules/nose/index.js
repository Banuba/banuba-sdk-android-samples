const am = bnb.scene.getAssetManager();

class NoseShape{
    constructor(){
        this.settings = {
            "shape": "default"
        }
    
        this.shapes = {
            "default":{
                "length": 0.0,
                "width": 0.0,
                "height": 0.0,
            }
    
        }
        this.lws = am.findMaterial("unused").findParameter("nose_shape_lws");
    }

    
    setShape({length, width, height}){
        this.lws.setVector4(new bnb.Vec4(
            length ? length : 0.0, 
            width ? width : 0.0, 
            height ? height : 0.0, 
            0.0))
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

exports.NoseShape = NoseShape