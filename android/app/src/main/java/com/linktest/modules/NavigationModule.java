package com.linktest.modules;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.linktest.NativeDemo;
import com.linktest.ProfileActivity;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import io.reactivex.Completable;
import io.reactivex.CompletableObserver;
import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;

public class NavigationModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext reactContext;

    public NavigationModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "Navigation";
    }


    @ReactMethod
    public void navigateTo(String destination) {
        Intent callingIntent;
        switch (destination) {
            case "NativeDemo":
                Log.d("Navigation", "Native Demo");
                callingIntent = NativeDemo.getCallingIntent(reactContext);
                break;
            default:
                return;
        }

        reactContext.startActivity(callingIntent);
    }


    @ReactMethod
    public void goBack() {
        Activity currentActivity = reactContext.getCurrentActivity();
        if (currentActivity != null) {
            currentActivity.finish();
        }
    }

}
