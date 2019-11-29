package com.linktest.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.TimeUnit;

import io.reactivex.Completable;
import io.reactivex.CompletableObserver;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;

public class MessageModule extends ReactContextBaseJavaModule {

    private static final String E_UNREAD_ERROR = "E_UNREAD_ERROR";

    public MessageModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
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
}
