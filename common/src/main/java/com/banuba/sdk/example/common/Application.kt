package com.banuba.sdk.example.common

import com.banuba.sdk.manager.BanubaSdkManager

const val BANUBA_CLIENT_TOKEN = <# Place your token here #>

class Application: android.app.Application() {
    override fun onCreate() {
        super.onCreate()
        BanubaSdkManager.initialize(this, BANUBA_CLIENT_TOKEN)
    }
}

