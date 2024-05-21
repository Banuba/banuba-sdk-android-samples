const am = bnb.scene.getAssetManager();

class Outfit{
    constructor(){
        this.settings = {
            "set": "first",
        }
        this.sets = {
            "default": "",
            "first" : "cloth_01",
            "second" : "cloth_02",
            "third" : "cloth_03",
            "fourth" : "cloth_04",
            "fifth" : "cloth_05",
            "sixth" : "cloth_06",
            "seventh" : "cloth_07",
            "eighth" : "cloth_08",
            "ninth" : "cloth_09",
            "tenth" : "cloth_10",
            "eleventh" : "cloth_11",
            "twelfth" : "cloth_12",
            "thirteenth" : "cloth_13",
            "fourteenth" : "cloth_14"
        }

        this.material_cloth = am.findMaterial("mat_cloth_01");
        this.material_logo = am.findMaterial("mat_logo_01");

        this.MI = bnb.scene.getRoot().findChildByName("Cloth").getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()
        this.Base = am.findImage("cloth_Base").asTexture();
        this.MR = am.findImage("cloth_MR").asTexture();
        this.Normal = am.findImage("cloth_Normal").asTexture();

        this.disableAll();
    }

    setShape(name){
        if(name == "default"){
            return
        }
        // am.uploadMeshData(this.mesh, "meshes/"+this.sets[name]+".bsm2")
        const Mesh = am.findMesh(this.sets[name])
        this.MI.setMesh(Mesh)
        this.MI.setSubGeometryMaterial("mat_cloth_01", this.material_cloth)
        this.MI.setSubGeometryMaterial("mat_logo_01", this.material_logo)
        this.Base.load("modules/outfit/images/"+this.sets[name]+"_Base.jpg")
        this.MR.load("modules/outfit/images/"+this.sets[name]+"_MR.jpg")
        this.Normal.load("modules/outfit/images/"+this.sets[name]+"_Normal.jpg")
        this.MI.setVisible(true)
    }

    disableAll(){
        this.MI.setVisible(false)

    }

    parameters({set}){
        set && this.setShape(set)
    }

    clear(){
        this.disableAll()
    }
}

exports.Outfit = Outfit