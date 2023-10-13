package com.example.trainbooking_mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import com.example.trainbooking_mobileapp.UserManagement.SignInActivity;

public class SplashScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        // Use a Handler to delay the transition to SignInActivity
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // Create an Intent to navigate to SignInActivity
                Intent intent = new Intent(SplashScreenActivity.this, SignInActivity.class);
                // Start the SignInActivity
                startActivity(intent);
                // Finish the SplashScreenActivity to prevent going back to it
                finish();
            }
        }, 2000); // Delay for 2000 milliseconds (2 seconds)
    }
}