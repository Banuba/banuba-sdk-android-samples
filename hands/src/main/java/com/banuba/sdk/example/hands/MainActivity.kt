package com.banuba.sdk.example.hands

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.banuba.sdk.example.common.CustomEffectsListAdapter
import com.banuba.sdk.example.hands.databinding.MainBinding
import com.banuba.sdk.input.CameraDevice
import com.banuba.sdk.input.CameraDeviceConfigurator
import com.banuba.sdk.input.CameraInput
import com.banuba.sdk.manager.BanubaSdkManager
import com.banuba.sdk.output.SurfaceOutput
import com.banuba.sdk.player.Player
import com.banuba.sdk.player.PlayerTouchListener

class MainActivity : AppCompatActivity(R.layout.main) {

    companion object {
        private const val TAG = "MainActivity"

        private val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.CAMERA
        )
    }

    private lateinit var binding: MainBinding
    private var effectsAdapter: CustomEffectsListAdapter? = null

    private var banubaPlayer: Player? = null
    private var cameraDevice: CameraDevice? = null
    private var surfaceOutput: SurfaceOutput? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = MainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initViews()
        initBanuba()
    }

    override fun onStart() {
        super.onStart()
        if (checkAllPermissionsGranted()) {
            onPermissionsGranted()
        } else {
            requestPermissions(REQUIRED_PERMISSIONS, 0)
        }
    }

    override fun onResume() {
        super.onResume()
        banubaPlayer?.play()
    }

    override fun onPause() {
        super.onPause()
        banubaPlayer?.pause()
    }

    override fun onStop() {
        cameraDevice?.stop()
        super.onStop()
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraDevice?.close()
        banubaPlayer?.close()
        surfaceOutput?.close()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        results: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, results)
        if (checkAllPermissionsGranted()) {
            onPermissionsGranted()
        } else {
            Toast.makeText(
                applicationContext,
                "Please grant all required permissions to proceed.",
                Toast.LENGTH_LONG
            ).show()
            finish()
        }
    }

    private fun onPermissionsGranted() {
        prepareBanuba()

        cameraDevice?.start()
    }

    private fun initBanuba() {
        banubaPlayer = Player()
        surfaceOutput = SurfaceOutput(binding.localSurfaceView.holder)
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun prepareBanuba() {
        cameraDevice = CameraDevice(applicationContext, this)
        cameraDevice?.configurator?.setLens(CameraDeviceConfigurator.LensSelector.BACK)?.commit()

        if (banubaPlayer == null) {
            Log.w(TAG, "Cannot prepare Banuba SDK: Banuba SDK is not initialized!")
            return
        }

        // Set layer will take input frames from and where the player will display the result
        banubaPlayer?.use(
            CameraInput(requireNotNull(cameraDevice)),
            arrayOf(surfaceOutput)
        )

        binding.localSurfaceView.setOnTouchListener(
            PlayerTouchListener(
                this,
                requireNotNull(banubaPlayer)
            )
        )
        binding.localSurfaceView.setZOrderMediaOverlay(true)

        val effects = BanubaSdkManager.loadEffects()
        effectsAdapter?.submitList(effects)

        // Apply first effect
        applyEffect(effects[0].path)
    }

    private fun applyEffect(effectPath: String) {
        banubaPlayer?.loadAsync(effectPath)
    }

    private fun checkAllPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    private fun initViews() {
         effectsAdapter = CustomEffectsListAdapter(
            resources.displayMetrics.widthPixels,
            effectPreviews
        ) { effectPath, position ->
            applyEffect(effectPath)

            binding.effectsList.smoothScrollToPosition(position)
        }

        binding.effectsList.layoutManager = CustomEffectsListAdapter.CenterLayoutManager(this)
        binding.effectsList.adapter = effectsAdapter
    }
}
