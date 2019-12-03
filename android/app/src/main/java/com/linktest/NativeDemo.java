package com.linktest;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.util.Log;
import android.view.View;

public class NativeDemo extends AppCompatActivity {
    public static Intent getCallingIntent(Context context) {
        return new Intent(context, NativeDemo.class);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("NativeDemo", "Native Demo");

        setContentView(R.layout.activity_native_demo);
    }

    public void goBack(View view) {
        finish();
    }

    public void moveForward(View view) {
        Intent callingIntent = ProfileActivity.getCallingIntent(this, "B139DF2B-E4A1-4D30-A838-FEA195167092");
        startActivity(callingIntent);
    }
}
