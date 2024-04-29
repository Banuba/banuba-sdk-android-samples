package com.banuba.sdk.example.camera

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.SurfaceView
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.banuba.sdk.input.CameraDevice
import com.banuba.sdk.input.CameraInput
import com.banuba.sdk.output.SurfaceOutput
import com.banuba.sdk.player.Player
import com.banuba.sdk.player.PlayerTouchListener


/**
 * Sample activity that shows how to apply masks with Banuba SDK.
 * Some Banuba masks can change their appearance if tapping on them.
 */
class MainActivity : AppCompatActivity(R.layout.main) {

    private val surfaceView by lazy(LazyThreadSafetyMode.NONE) {
        findViewById<SurfaceView>(R.id.surfaceView)
    }

    private val showMaskButton by lazy(LazyThreadSafetyMode.NONE) {
        findViewById<Button>(R.id.showMaskButton)
    }
    companion object {
        private const val MASK_NAME = "effects/TrollGrandma"
        val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
        )

        const val REQUEST_CODE_PERMISSIONS = 1000
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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set layer will take input frames from and where the player will display the result
        player.use(CameraInput(cameraDevice), surfaceOutput)

        // Set custom OnTouchListener to change mask style.
        surfaceView.setOnTouchListener(PlayerTouchListener(this, player))

        var shouldApply = false
        showMaskButton.setOnClickListener {
            shouldApply = !shouldApply

            showMaskButton.text = if (shouldApply) "Hide mask" else "Show mask"

            // The mask is loaded asynchronously and applied
            player.loadAsync(if (shouldApply) MASK_NAME else "")
        }
    }

    override fun onStart() {
        super.onStart()
        if (!allPermissionsGranted()) {
            requestPermissions(REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
        }

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
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, results: IntArray) {
        if (!requireAllPermissionsGranted(permissions, results)) {
            finish()
        }
        super.onRequestPermissionsResult(requestCode, permissions, results)
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }
}

fun Context.requireAllPermissionsGranted(permissions: Array<String>, results: IntArray): Boolean {
    val notGrantedPermissionIndex = results.indexOfFirst { result ->
        result != PackageManager.PERMISSION_GRANTED
    }

    return if (notGrantedPermissionIndex != -1) {
        val notGrantedPermission = permissions[notGrantedPermissionIndex]
        Toast.makeText(applicationContext,
            """Not all permissions granted. Please grant $notGrantedPermission permission.""",
            Toast.LENGTH_LONG)
            .show()

        false
    } else {
        true
    }
}
