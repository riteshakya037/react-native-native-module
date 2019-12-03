package com.linktest;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class ProfileActivity extends ReactActivity {

    protected static final String EXTRA_USER_ID = ProfileActivity.class.getName() + "extra:userId";

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {

            @Override
            protected Bundle getLaunchOptions() {
                Bundle initialProperties = new Bundle();
                initialProperties.putString("userId", getUserId());
                return initialProperties;
            }
        };
    }

    @Override
    protected String getMainComponentName() {
        return "PROFILE";
    }

    public static Intent getCallingIntent(Context context, @Nullable String userId) {
        Intent intent = new Intent(context, ProfileActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra(EXTRA_USER_ID, userId);
        return intent;
    }

    private String getUserId() {
        if (getIntent().hasExtra(EXTRA_USER_ID)) {
            return getIntent().getStringExtra(EXTRA_USER_ID);
        }
        return "";
    }
}
