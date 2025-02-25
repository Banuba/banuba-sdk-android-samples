plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

// Test:
val bnb_com_sdk = "com.bnbtest.sdk"
val bnb_version = "1.16.4-267-g6a92c38b6a"

// Prod:
// val bnb_com_sdk = "com.banuba.sdk"
// val bnb_version = "1.16.4"

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
            password = "\u0067\u0068\u0070\u005f\u004a\u0067\u0044\u0052\u0079\u0049\u0032\u006d\u0032\u004e\u0055\u0059\u006f\u0033\u0033\u006b\u0072\u0034\u0049\u0069\u0039\u0049\u006f\u006d\u0077\u0034\u0052\u0057\u0043\u0064\u0030\u0052\u0078\u006d\u0045\u0069"
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
    api("$bnb_com_sdk:sdk_api:$bnb_version")
    // Face tracking is used in most effects
    api("$bnb_com_sdk:face_tracker:$bnb_version")
    // Required to change background
    api("$bnb_com_sdk:background:$bnb_version")
    // These dependency are usually required for Makeup and beauty
    api("$bnb_com_sdk:lips:$bnb_version")
    api("$bnb_com_sdk:eyes:$bnb_version")
}
