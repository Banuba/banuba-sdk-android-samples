const am = bnb.scene.getAssetManager();

class Glasses{
    constructor(){
        this.settings = {
            "frame": "default",
            "color": "default"
        }
        this.frames = {
            "default" : "",
            "first" : "glasses_01",
        }
        this.colors = {
            "default": "0., 0., 0., 0.",
            "first": "1., 0., 0., 0."

        }

        this.material_glasses = am.findMaterial("mat_glasses_01");

        this.MI = bnb.scene.getRoot().findChildByName("Glasses").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.Base = am.findImage("glasses_Base").asTexture();
        this.MR = am.findImage("glasses_MR").asTexture();
        this.Normal = am.findImage("glasses_Normal").asTexture();
        this.glasses_color = am.findMaterial("unused").findParameter("glasses_color");

        this.disableAll()
    }

    setShape(name){
        if(name == "default"){
            return
        }
        // am.uploadMeshData(this.mesh, "meshes/"+this.sets[name]+".bsm2")
        const Mesh = am.findMesh(this.frames[name])
        this.MI.setMesh(Mesh)
        this.MI.setSubGeometryMaterial("mat_glasses_01", this.material_glasses)
        this.Base.load("modules/glasses/images/"+this.frames[name]+"_Base.png")
        this.MR.load("modules/glasses/images/"+this.frames[name]+"_MR.png")
        this.Normal.load("modules/glasses/images/"+this.frames[name]+"_Normal.png")
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
        this.glasses_color.setVector4(new bnb.Vec4(x,y,z,1.0))
    }

    disableAll(){
        this.MI.setVisible(false)

    }

    parameters({frame, color}){
        frame && this.setShape(frame)
        color && this.setColor(color)
    }

    clear(){
        this.disableAll()
    }
}

exports.Glasses = Glasses