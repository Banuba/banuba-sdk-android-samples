package com.banuba.sdk.example.texture_input

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.SurfaceView
import com.banuba.sdk.effect_player.CameraOrientation
import com.banuba.sdk.example.common.BaseActivity
import com.banuba.sdk.input.HardwareBufferPool
import com.banuba.sdk.input.StreamInput
import com.banuba.sdk.output.SurfaceOutput
import com.banuba.sdk.player.Player
import com.banuba.sdk.player.PlayerTouchListener
import com.banuba.sdk.types.FrameData
import com.banuba.sdk.types.FullImageData


/**
 * Sample activity that shows how to apply masks with Banuba SDK.
 * Some Banuba masks can change their appearance if tapping on them.
 */
class MainActivity : BaseActivity(R.layout.main) {

    private val surfaceView by lazy(LazyThreadSafetyMode.NONE) {
        findViewById<SurfaceView>(R.id.surfaceView)
    }

    companion object {
        private const val MASK_NAME = "effects/TrollGrandma"
        private const val VIDEO_FILE = "face_video_720p.mp4"
    }

    // The player executes the main pipeline
    private val player by lazy(LazyThreadSafetyMode.NONE) {
        Player()
    }

    // This video input will pass frames from the video file to the player
    private val streamInput by lazy(LazyThreadSafetyMode.NONE) {
        StreamInput()
    }

    // The result will be displayed on the surface
    private val surfaceOutput by lazy(LazyThreadSafetyMode.NONE) {
        SurfaceOutput(surfaceView.holder)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set layer will take input frames from and where the player will display the result
        player.use(streamInput, surfaceOutput)

        // Set custom OnTouchListener to change mask style.
        surfaceView.setOnTouchListener(PlayerTouchListener(this, player))

    }

    private val hbp = HardwareBufferPool()

    private fun prepareInput () {
        Thread {

            var inVideo : VideoTrack? = null
            player.renderThreadExecutor().execute {
                inVideo = VideoTrack(this, VIDEO_FILE)
            }

            while (inVideo == null) {
                Thread.yield()
            }

            var videoFrame : VideoFrame? = inVideo!!.requestNextFrame()
            while (videoFrame != null) {
                player.renderThreadExecutor().execute {
                    if (videoFrame != null) {
                        val ahb = hbp.obtain(
                            videoFrame!!.size.width,
                            videoFrame!!.size.height,
                            videoFrame!!.presentationTimeUs
                        )
                        val fid = FullImageData(ahb, videoFrame!!.externalTexture,
                            FullImageData.Orientation(CameraOrientation.DEG_0)
                        )
                        val fd = FrameData.create()
                        fd!!.addFullImg(fid)
                        streamInput.push(fd, videoFrame!!.presentationTimeUs)
                        videoFrame = inVideo?.requestNextFrame()
                        player.render()
                    }
                    Thread.sleep(60)
                }
            }
        }.start()
    }

    override fun onStart() {
        super.onStart()
    }

    override fun onResume() {
        super.onResume()
        // Running the player
        player.play()
        player.load(MASK_NAME)
        player.setRenderMode(Player.RenderMode.MANUAL)
        prepareInput()
    }

    override fun onPause() {
        super.onPause()
        // Pause the player when activity is inactive
        player.pause()
    }

    override fun onStop() {
        // After this method, the camera will stop capturing frames and transmitting them to player
        super.onStop()
    }

    override fun onDestroy() {
        // After you are done using the player, you must free all resources by calling close() method
        surfaceOutput.close()
        player.close()
        super.onDestroy()
    }
}
