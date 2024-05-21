const am = bnb.scene.getAssetManager();

class Headwear{
    constructor(){
        this.settings = {
            "shape": "default",
            "color": "default"
        }
        this.shapes = {
            "default" : "",
            "first" : {
                "name": "",
                "hair": false,
            },
            "second" : {
                "name": "hat_02",
                "hair": true,
            },

        }
        this.colors = {
            "default": "0., 0., 0., 0.",
            "first": "1., 0., 0., 0."

        }

        this.material_headwear = am.findMaterial("mat_hat_01");

        this.MI = bnb.scene.getRoot().findChildByName("Hat").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.Base = am.findImage("hat_Base").asTexture();
        this.MR = am.findImage("hat_MR").asTexture();
        this.Normal = am.findImage("hat_Normal").asTexture();
        this.headwear_color = am.findMaterial("unused").findParameter("hat_color");
        this.is_hat = am.findMaterial("unused").findParameter("is_hat");
        
        this.disableAll()
    }

    setShape(shape){
        if(shape == "default"){
            return
        }
        // am.uploadMeshData(this.mesh, "meshes/"+this.sets[name]+".bsm2")
        const Mesh = am.findMesh(this.shapes[shape].name)
        this.MI.setMesh(Mesh)
        this.MI.setSubGeometryMaterial("mat_hat_01", this.material_headwear)
        this.Base.load("modules/headwear/images/"+this.shapes[shape]+"_Base.png")
        this.MR.load("modules/headwear/images/"+this.shapes[shape]+"_MR.png")
        this.Normal.load("modules/headwear/images/"+this.shapes[shape]+"_Normal.png")
        this.shapes[shape].hair && this.is_hat.setVector4(new bnb.Vec4(1.,0.,0.,0.))
        this.MI.setVisible(true)
    }

    setColor(color){
        let c;
        if(color.charAt(0) == "@"){
            c = color.substring(1);
        } else {
            c = this.colors[color] || this.colors["default"];
        }
        const [x,y,z] = c.split(',');
        this.headwear_color.setVector4(new bnb.Vec4(x,y,z,1.0))
    }

    disableAll(){
        this.MI.setVisible(false)
        this.is_hat.setVector4(new bnb.Vec4(0.,0.,0.,0.))
    }

    parameters({shape, color}){
        shape && this.setShape(shape)
        color && this.setColor(color)
    }

    clear(){
        this.disableAll()
    }
}

exports.Headwear = Headwear