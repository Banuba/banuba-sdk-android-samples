plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.banuba.sdk.example.common"
    compileSdk = 34

    defaultConfig {
        minSdk = 23
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt")
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }

    buildFeatures {
        viewBinding = true
    }
}

repositories {
    google()
    mavenCentral()
    maven {
        name = "GitHubPackages"
        url = uri("https://maven.pkg.github.com/sdk-banuba/banuba-sdk-android")
        credentials {
            username = "sdk-banuba"
            password = "\u0067\u0068\u0070\u005f\u0033\u0057\u006a\u0059\u004a\u0067\u0071\u0054\u0058\u0058\u0068\u0074\u0051\u0033\u0075\u0038\u0051\u0046\u0036\u005a\u0067\u004f\u0041\u0053\u0064\u0046\u0032\u0045\u0046\u006a\u0030\u0036\u006d\u006e\u004a\u004a"
        }
    }
}

dependencies {
    api("androidx.recyclerview:recyclerview:1.3.2")
    api("androidx.constraintlayout:constraintlayout:2.1.4")
    api("androidx.appcompat:appcompat:1.6.1")

    // Below are Banuba dependencies.
    // This API module, it is must be in your project, other dependecnies
    // are option. Everything depends on your needs
    // https://docs.banuba.com/face-ar-sdk-v1/core/tutorials/using_packages/#list-of-all-available-packages
    api("com.banuba.sdk:sdk_api:1.12.+")
    // Face tracking is used in most effects
    api("com.banuba.sdk:face_tracker:1.12.+")
    // Required to change background
    api("com.banuba.sdk:background:1.12.+")
    // These dependency are usually required for Makeup and beauty
    api("com.banuba.sdk:lips:1.12.+")
    api("com.banuba.sdk:eyes:1.12.+")

}