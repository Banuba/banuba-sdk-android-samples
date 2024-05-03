package com.banuba.sdk.example.beauty

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.SurfaceView
import com.banuba.sdk.example.common.BaseActivity
import com.banuba.sdk.input.CameraDevice
import com.banuba.sdk.input.CameraInput
import com.banuba.sdk.output.SurfaceOutput
import com.banuba.sdk.player.Player
import com.banuba.sdk.player.PlayerTouchListener

// See
// https://docs.banuba.com/face-ar-sdk-v1/effect_api/face_beauty
// https://docs.banuba.com/face-ar-sdk-v1/effect_api/makeup
// About effect JS API
const val beautyConfig = """

function FaceReshape(strength){
    FaceMorph.face({chin: -0.4 * strength});
    FaceMorph.lips({height: 0.8 * strength});
    FaceMorph.face({
        jaw_narrowing: 0.35 * strength,
        chin_narrowing: 0.35 * strength,
        narrowing: 0.25 * strength,
        cheekbones_narrowing: -0.5 * strength,
        forehead: 0.1 * strength
    });
    FaceMorph.nose({
        width: 0.3 * strength,
        length: 0.2 * strength,
        tip_width: -0.4 * strength
    });
    FaceMorph.lips({size: 0.3 * strength});
}

FaceMorph.eyes({enlargement: 0.5});
FaceReshape(1.0);
Lips.color("0.898 0.431 0.663 0.9");
Skin.softening(1.0);
Background.blur(0.55);
Makeup.blushes("0.871 0.365 0.514 0.5");
Eyes.color("0.082 0.412 0.780 0.5");
Brows.color("0.004 0.004 0.004 0.4");
Teeth.whitening(0.5);
Eyes.whitening(0.2);
Makeup.eyeshadow("0.322 0.341 0.435 0.5");
"""

/**
 * Sample activity that shows how to apply masks with Banuba SDK.
 * Some Banuba masks can change their appearance if tapping on them.
 */
class MainActivity : BaseActivity(R.layout.main) {

    private val surfaceView by lazy(LazyThreadSafetyMode.NONE) {
        findViewById<SurfaceView>(R.id.surfaceView)
    }

    // The player executes the main pipeline
    private val player by lazy(LazyThreadSafetyMode.NONE) {
        Player()
    }

    // This camera device will pass frames to the CameraInput
    private val cameraDevice by lazy(LazyThreadSafetyMode.NONE) {
        CameraDevice(requireNotNull(this.applicationContext), this@MainActivity)
    }

    // The result will be displayed on the surface
    private val surfaceOutput by lazy(LazyThreadSafetyMode.NONE) {
        SurfaceOutput(surfaceView.holder)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set layer will take input frames from and where the player will display the result
        player.use(CameraInput(cameraDevice), surfaceOutput)

        // Set custom OnTouchListener to change mask style.
        surfaceView.setOnTouchListener(PlayerTouchListener(this, player))

        val effect = player.loadAsync("effects/Makeup")

        // This will evalute JS code in context of Makeup effect. You may also
        // place it at the end of `config.js` in Makeup effect (see effect folder
        // in this project files.
        effect?.evalJs(beautyConfig, null)
    }

    override fun onStart() {
        super.onStart()
        // We start the camera and then player starts taking frames
        cameraDevice.start()
    }

    override fun onResume() {
        super.onResume()
        // Running the player
        player.play()
    }

    override fun onPause() {
        super.onPause()
        // Pause the player when activity is inactive
        player.pause()
    }

    override fun onStop() {
        // After this method, the camera will stop capturing frames and transmitting them to player
        cameraDevice.stop()
        super.onStop()
    }

    override fun onDestroy() {
        // After you are done using the player, you must free all resources by calling close() method
        cameraDevice.close()
        surfaceOutput.close()
        player.close()
        super.onDestroy()
    }
}
