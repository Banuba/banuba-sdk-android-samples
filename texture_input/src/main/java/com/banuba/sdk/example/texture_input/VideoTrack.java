package com.banuba.sdk.example.texture_input;

import static android.opengl.GLES11Ext.*;
import static android.opengl.GLES30.*;
import static java.util.Objects.requireNonNull;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaCodec;
import android.media.MediaCodec.BufferInfo;
import android.media.MediaExtractor;
import android.media.MediaFormat;
import android.util.Log;
import android.util.Size;
import android.view.Surface;

import com.banuba.renderer.VideoTextureProvider;
import com.banuba.sdk.internal.gl.GlUtils;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;

/*package*/ class VideoTrack {

    @SuppressLint("RestrictedApi")
    public VideoTrack(Context context, String assetsFileName) throws IOException {
        glGenTextures(1, mTexture);
        glBindTexture(GL_TEXTURE_EXTERNAL_OES, mTexture.get(0));
        glTexParameteri(GL_TEXTURE_EXTERNAL_OES, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_EXTERNAL_OES, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_EXTERNAL_OES, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
        glTexParameteri(GL_TEXTURE_EXTERNAL_OES, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
        glBindTexture(GL_TEXTURE_EXTERNAL_OES, 0);
        GlUtils.checkGlError("VideoTrack; mTexture; create ");

        AssetFileDescriptor afd = context.getAssets().openFd(assetsFileName);
        mExtractor.setDataSource(afd);
        afd.close();

        int tracksCount = mExtractor.getTrackCount();
        Surface mSurface = requireNonNull(
           mVideoTextureProvider.createSurfaceTexture(mTexture.get(0))
        );
        for (int i = 0; i < tracksCount; i++) {
            MediaFormat format = mExtractor.getTrackFormat(i);
            String mime = format.getString(MediaFormat.KEY_MIME);
            if (!mime.startsWith("video/")) {
                continue;
            }
            mExtractor.selectTrack(i);

            if (mCodec != null) {
                Log.e("VideoTrack", "Multi-track videos are not supported.");
                return;
            }

            mCodec = MediaCodec.createDecoderByType(mime);
            mCodec.configure(format, mSurface, null, 0);
            mSize = new Size(
               format.getInteger(MediaFormat.KEY_WIDTH),
               format.getInteger(MediaFormat.KEY_HEIGHT)
            );
            // long mDurationUs = format.getLong(MediaFormat.KEY_DURATION);
            mCodec.start();
        }
    }

    public VideoFrame requestNextFrame() {
        while (true) {
            int bufidx = mCodec.dequeueInputBuffer(DEQUEUE_TIMEOUT);
            if (bufidx < 0) return null;

            ByteBuffer buffer = mCodec.getInputBuffer(bufidx);
            int sampleSize = mExtractor.readSampleData(buffer, 0);
            boolean eos = sampleSize < 0;
            if (eos) return null;
            long presentationTimeUs = mExtractor.getSampleTime();

            mCodec.queueInputBuffer(
               bufidx,
               0,
               sampleSize,
               presentationTimeUs,
               0
            );

            mExtractor.advance();

            BufferInfo info = new BufferInfo();
            int idx = mCodec.dequeueOutputBuffer(info, DEQUEUE_TIMEOUT);
            if (idx < 0) {
                // retry
                continue;
            }
            mCodec.releaseOutputBuffer(idx, info.size != 0);

            while (!mVideoTextureProvider.isReadyOnGPU()) Thread.yield();

            eos = (info.flags & MediaCodec.BUFFER_FLAG_END_OF_STREAM) != 0;
            if (eos) return null;

            return new VideoFrame(mTexture.get(0), mSize, presentationTimeUs, mVideoTextureProvider);
        }
    }

    private static final long DEQUEUE_TIMEOUT = 10_000;
    private final IntBuffer mTexture = IntBuffer.allocate(1);
    private final MediaExtractor mExtractor = new MediaExtractor();
    private final VideoTextureProvider mVideoTextureProvider = new VideoTextureProvider();
    private MediaCodec mCodec;
    private Size mSize;
}

/*package*/ class VideoFrame {
    private final int mExternalTexture;
    private final Size mSize;
    private final long mPresentationTimeUs;
    private final VideoTextureProvider mVtp;
    /*package*/ VideoFrame(int externalTexture, Size size, long presentationTimeUs, VideoTextureProvider vtp) {
        mExternalTexture = externalTexture;
        mSize = size;
        mPresentationTimeUs = presentationTimeUs;
        mVtp = vtp;
    }

    public int getExternalTexture() {
        mVtp.update();
        return mExternalTexture;
    }

    public long getPresentationTimeUs() {
        return mPresentationTimeUs;
    }

    public Size getSize() {
        return mSize;
    }
}
