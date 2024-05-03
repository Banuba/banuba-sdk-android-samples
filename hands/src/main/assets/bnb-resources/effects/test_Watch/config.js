bnb.scene.enableRecognizerFeature(bnb.FeatureID.WATCH);

const watch = bnb.scene.getRoot().findChildByName('watch')
const mesh = watch.getComponent(bnb.ComponentType.MESH_INSTANCE).asMeshInstance()

mesh.animationPlay()
