bnb.scene.enableRecognizerFeature(bnb.FeatureID.HAND_GESTURES)

let txtField = bnb.scene.getAssetManager().findImage("text")
let hand = bnb.scene.getAssetManager().findHand("hand_skelet")

let text = "No Gesture";
let prevText = text

bnb.eventListener.on("onUpdate", ()=> {
    let gesture = hand.getGesture()
    switch (gesture) {
        case bnb.GestureType.NO_GESTURE:
            text = "No Gesture";
            break;
        case bnb.GestureType.LIKE:
            text = "Like";
            break;
        case bnb.GestureType.OK:
            text = "Ok";
            break;
        case bnb.GestureType.ROCK:
            text = "Rock";
            break;
        case bnb.GestureType.VICTORY:
            text = "Victory";
            break;
        case bnb.GestureType.PALM:
            text = "Palm";
            break;
    }

    if (text !== prevText) {
        bnb.scene.addEffectEvent("gesture", {"type": text});
        prevText = text
    }

    txtField.asTextTexture().setText(text);
})
