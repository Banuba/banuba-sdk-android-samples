package com.banuba.sdk.example.common

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.widget.Toast
import androidx.annotation.LayoutRes
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat


open class BaseActivity(@LayoutRes contentLayoutId: Int) :
    AppCompatActivity(contentLayoutId) {

    companion object {
        val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
        )

        const val REQUEST_CODE_PERMISSIONS = 1000
    }
    override fun onStart() {
        super.onStart()
        if (!allPermissionsGranted()) {
            requestPermissions(REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, results: IntArray) {
        if (!requireAllPermissionsGranted(permissions, results)) {
            finish()
        }
        super.onRequestPermissionsResult(requestCode, permissions, results)
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }
}

fun Context.requireAllPermissionsGranted(permissions: Array<String>, results: IntArray): Boolean {
    val notGrantedPermissionIndex = results.indexOfFirst { result ->
        result != PackageManager.PERMISSION_GRANTED
    }

    return if (notGrantedPermissionIndex != -1) {
        val notGrantedPermission = permissions[notGrantedPermissionIndex]
        Toast.makeText(applicationContext,
            """Not all permissions granted. Please grant $notGrantedPermission permission.""",
            Toast.LENGTH_LONG)
            .show()

        false
    } else {
        true
    }
}