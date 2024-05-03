Example for 
[Banuba SDK on Android](https://docs.banuba.com/face-ar-sdk-v1/android/android_overview) 
and [Agora.io](https://www.agora.io/en/) SDK integration to enhance video calls 
with real-time face filters and virtual backgrounds.  
  
# Getting Started

1. Get the latest Banuba SDK client token. Please fill in our form on 
[form on banuba.com](https://www.banuba.com/face-filters-sdk) website, or 
contact us via [info@banuba.com](mailto:info@banuba.com).
2. Copy and Paste your banuba client token into appropriate section of 
`common/src/main/java/com/banuba/sdk/example/common/Application.kt`.
3. Visit [agora.io](https://www.agora.io/) to sign up and get token, app and 
channel ID.
4. Copy and Paste your agora token, app and chanel ID into appropriate section 
of `src/main/java/com/banuba/sdk/example/videocall/MainActivity.kt`.
5. Open the project in Android Studio and run.

# How an example works

This project is based on the `PlayerAPI`. `CameraDevice` creates and manages the 
Banuba camera. Agora also has its own camera module, but in this example the 
Agora camera is not used, so in order to disable Agora camera is called 
`setExternalVideoSource(...)`.  The frames from the Banuba camera are processed 
within Banuba Player and the result transferred to the handler `FrameOutput`. In 
the handler, frames are passed to the Agora module via `pushCustomFrame(...)`.