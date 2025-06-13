import com.android.build.gradle.internal.tasks.factory.dependsOn

plugins {
    id("com.android.application").version("8.3.2")
    id("org.jetbrains.kotlin.android").version("1.9.0")
}

buildscript{
    apply(from = "../common/common.gradle.kts")
}

val commonCompileSdk: Int by extra
val commonMinSdk: Int by extra
val commonKotlinJvmTarget: String by extra


android {
    namespace = "com.banuba.sdk.example.video_recording"
    compileSdk = commonCompileSdk

    defaultConfig {
        applicationId = "com.banuba.sdk.example.video_recording"
        minSdk = commonMinSdk
        targetSdk = commonCompileSdk
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
        jvmTarget = commonKotlinJvmTarget
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

task("copyEffects") {
    copy {
        from("../common/effects")
        into("src/main/assets/bnb-resources/effects")
    }
}

gradle.projectsEvaluated {
    project.tasks.preBuild.dependsOn("copyEffects")
}

dependencies {
    implementation(project(":common"))
}

