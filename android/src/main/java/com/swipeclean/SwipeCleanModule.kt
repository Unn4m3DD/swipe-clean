package com.swipeclean

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.content.pm.PackageManager
import android.graphics.drawable.Drawable
import android.content.Context

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class SwipeCleanModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SwipeClean")

        Function("uninstall") { bundleId: String ->
            val activity = appContext.activityProvider?.currentActivity
            
            if (activity == null) {
                return@Function "Failed1"
            }

            val intent = Intent(Intent.ACTION_DELETE).apply {
                data = Uri.parse("package:$bundleId")
                putExtra(Intent.EXTRA_RETURN_RESULT, true)
            }

            try {
              activity.startActivityForResult(intent, 1)
                return@Function "success1"
            } catch (e: Exception) {
                return@Function "fail2"
            }
        }
        AsyncFunction("getInstalledApps") { 
          val packageManager = appContext.reactContext!!.packageManager
          val apps = packageManager.getInstalledApplications(PackageManager.GET_META_DATA)
          val appList = mutableListOf<Map<String, Any>>()

          for (app in apps) {
              val appInfo = mutableMapOf<String, Any>()
              val appName = packageManager.getApplicationLabel(app).toString()
              val appIcon: Drawable = packageManager.getApplicationIcon(app)

              appInfo["name"] = appName
              appInfo["packageName"] = app.packageName
              appInfo["icon"] = drawableToBase64(appIcon)

              appList.add(appInfo)
          }

          return@AsyncFunction appList 
      }
    }
    private fun drawableToBase64(drawable: Drawable): String {
      // Check if the Drawable is a BitmapDrawable
      val bitmap = if (drawable is android.graphics.drawable.BitmapDrawable) {
          drawable.bitmap
      } else {
          // If it's not a BitmapDrawable, create a bitmap from the Drawable
          val width = drawable.intrinsicWidth
          val height = drawable.intrinsicHeight
  
          // Ensure the Drawable has valid dimensions
          if (width <= 0 || height <= 0) {
              return ""  // Return empty string if dimensions are invalid
          }
  
          val bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888)
          val canvas = android.graphics.Canvas(bitmap)
          drawable.setBounds(0, 0, canvas.width, canvas.height)
          drawable.draw(canvas)
          bitmap
      }
  
      val byteArrayOutputStream = java.io.ByteArrayOutputStream()
      bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
      val byteArray = byteArrayOutputStream.toByteArray()
      return android.util.Base64.encodeToString(byteArray, android.util.Base64.DEFAULT)
  }
}
