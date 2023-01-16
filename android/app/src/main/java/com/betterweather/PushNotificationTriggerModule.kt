package com.betterweather

import android.R
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import android.app.NotificationManager
import android.app.NotificationChannel
import android.content.Context
import android.os.Build
import android.util.Log

class PushNotificationTriggerModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {
    var notificationChannelId = "notify_WeatherChannel"

    init {
        createNotificationChannel()
    }

    override fun getName(): String {
        return "PushNotificationTrigger"
    }

    @ReactMethod
    fun showNotification(title: String?, content: String?) {
        val notification = NotificationCompat.Builder(reactApplicationContext, notificationChannelId)
                .setSmallIcon(R.drawable.ic_menu_mylocation)
                .setContentTitle(title)
                .setContentText(content)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .build()
        val notificationManager = NotificationManagerCompat.from(reactApplicationContext)
        Log.d("Notification", "Notification: " + notification)
        notificationManager.notify(666, notification)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence = "Weather"
            val descriptionText = "Weather description"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(notificationChannelId, name, importance).apply { description = descriptionText }
            val notificationManager = reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            Log.d("cNotificationChannel ", "" + notificationManager)
            notificationManager.createNotificationChannel(channel)
        }
    }
}