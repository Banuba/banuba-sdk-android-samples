plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

buildscript{
    apply(from = "common.gradle.kts")
}

val commonCompileSdk: Int by extra
val commonMinSdk: Int by extra
val commonKotlinJvmTarget: String by extra

val bnbComSdk: String by extra
val bnbVersion: String by extra

android {
    namespace = "com.banuba.sdk.example.common"
    compileSdk = commonCompileSdk

    defaultConfig {
        minSdk = commonMinSdk
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
        jvmTarget = commonKotlinJvmTarget
    }

    buildFeatures {
        viewBinding = true
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
    api("$bnbComSdk:sdk_api:$bnbVersion")
    // Face tracking is used in most effects
    api("$bnbComSdk:face_tracker:$bnbVersion")
    // Required to change background
    api("$bnbComSdk:background:$bnbVersion")
    // These dependency are usually required for Makeup and beauty
    api("$bnbComSdk:lips:$bnbVersion")
    api("$bnbComSdk:eyes:$bnbVersion")
}
