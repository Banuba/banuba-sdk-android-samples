import com.android.build.gradle.internal.tasks.factory.dependsOn

plugins {
    id("com.android.application").version("8.3.2")
    id("org.jetbrains.kotlin.android").version("1.9.0")
}

val bnb_version = "1.14.+"

android {
    namespace = "com.banuba.sdk.example.hands"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.banuba.sdk.example.hands"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        vectorDrawables {
            useSupportLibrary = true
        }
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
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation(project(":common"))
    implementation("com.banuba.sdk:hands:$bnb_version")
    implementation("com.banuba.sdk:watch:$bnb_version")
}

