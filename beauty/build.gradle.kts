import com.android.build.gradle.internal.tasks.factory.dependsOn

plugins {
    id("com.android.application").version("8.3.2")
    id("org.jetbrains.kotlin.android").version("1.9.0")
}

android {
    namespace = "com.banuba.sdk.example.beauty"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.banuba.sdk.example.beauty"
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
}

task("copyEffects") {
    copy {
        from("../common/Makeup")
        into("src/main/assets/bnb-resources/effects/Makeup")
    }
    copy {
        from("../common/effects/0003_cu_Spider1_v3_b1")
        into("src/main/assets/bnb-resources/effects/0003_cu_Spider1_v3_b1")
    }
}

gradle.projectsEvaluated {
    project.tasks.preBuild.dependsOn("copyEffects")
}

dependencies {
    implementation(project(":common"))
}

