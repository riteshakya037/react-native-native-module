package com.linktest.modules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import io.reactivex.Completable;
import io.reactivex.CompletableObserver;
import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;

public class MessageModule extends ReactContextBaseJavaModule {

    private static final String E_UNREAD_ERROR = "E_UNREAD_ERROR";

    private static final String C_UNREAD_EVENT = "EventUnread";

    private Disposable disposableEmitter = null;
    private ReactApplicationContext reactContext;

    public MessageModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "Message";
    }


    @ReactMethod
    public void getUnreadCount(
            Promise callbackPromise
    ) {
        // Get unread count here from database
        Completable.timer(5, TimeUnit.SECONDS, AndroidSchedulers.mainThread())
                .subscribe(new CompletableObserver() {
                    @Override
                    public void onSubscribe(Disposable d) {
                    }

                    @Override
                    public void onComplete() {
                        callbackPromise.resolve(10);
                    }

                    @Override
                    public void onError(Throwable e) {
                        callbackPromise.reject(E_UNREAD_ERROR, e);
                    }
                });
    }

    @ReactMethod
    public void startListening() {
        if (disposableEmitter == null) {
            disposableEmitter = Observable.interval(1000L, TimeUnit.MILLISECONDS)
                    .timeInterval()
                    .observeOn(AndroidSchedulers.mainThread()).subscribe(longTimed -> {
                        WritableMap params = Arguments.createMap();
                        params.putDouble("count", longTimed.value().doubleValue());
                        sendEvent(reactContext, C_UNREAD_EVENT, params);
                    });
        }

    }

    private void sendEvent(ReactApplicationContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(C_UNREAD_EVENT, C_UNREAD_EVENT);
        return constants;
    }


    @ReactMethod
    public void stopListening() {
        if (disposableEmitter != null) {
            disposableEmitter.dispose();
            disposableEmitter = null;
        }
    }
}
