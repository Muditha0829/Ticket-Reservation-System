package com.example.trainbooking_mobileapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;

import com.example.trainbooking_mobileapp.ReservationManagement.CreateReservationActivity;
import com.example.trainbooking_mobileapp.ReservationManagement.reservationDetailsActivity;
import com.example.trainbooking_mobileapp.TrainManagement.TrainDetailsActivity;
import com.example.trainbooking_mobileapp.UserManagement.UserProfileActivity;
import com.example.trainbooking_mobileapp.UserManagement.SignInActivity;

public class MainActivity extends AppCompatActivity {

    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Home");

        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        String userID = getIntent().getStringExtra("userID");
        Log.d("mainActivity", "Received userID: " + userID);

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button2 = findViewById(R.id.button2);
        ImageButton Button3 = findViewById(R.id.button3);
        ImageButton Button4 = findViewById(R.id.button4);
        ImageButton Button5 = findViewById(R.id.button5);
        ImageButton Button6 = findViewById(R.id.button6);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
                Log.d("mainActivity", "Received userID: " + userID);
            }
        });
        Button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, CreateReservationActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
                Log.d("mainActivity", "Received userID: " + userID);
            }
        });
        Button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, reservationDetailsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
                Log.d("mainActivity", "Received userID: " + userID);
            }
        });
        Button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, TrainDetailsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
                Log.d("mainActivity", "Received userID: " + userID);
            }
        });
        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    // ...

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_sign_out:
                // Perform sign out logic here
                // For example, you can start the sign-in activity
                Intent intent = new Intent(MainActivity.this, SignInActivity.class);
                startActivity(intent);
                finish(); // Finish the current activity after signing out
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}