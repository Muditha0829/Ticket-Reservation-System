package com.example.trainbooking_mobileapp.TrainManagement;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.UserManagement.UserProfileActivity;
import com.example.trainbooking_mobileapp.UserManagement.SignInActivity;

import java.util.List;

public class TrainDetailsActivity extends AppCompatActivity implements TrainApiClient.OnTrainDataReceivedListener {

    // RecyclerView to display train list
    private RecyclerView recyclerView;

    // Adapter for the RecyclerView
    private TrainListAdapter trainListAdapter;

    // API client for fetching train data
    private TrainApiClient trainApiClient;

    // Toolbar for the activity
    private Toolbar toolbar;

    // User ID associated with the activity
    private String userID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the content view to the activity_train_list.xml layout
        setContentView(R.layout.activity_train_list);

        // Initialize the toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Set the title of the activity
        setTitle("Train Schedules");

        // Enable the back button in the toolbar
        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        // Initialize the RecyclerView and set its layout manager
        recyclerView = findViewById(R.id.trainRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize the TrainApiClient
        trainApiClient = new TrainApiClient();

        // Fetch active trains from the API
        trainApiClient.getActiveTrainsFromAPI(this);

        // Get the user ID from the intent
        userID = getIntent().getStringExtra("userID");

        // Initialize buttons and set click listeners
        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button5 = findViewById(R.id.button5);
        ImageButton Button6 = findViewById(R.id.button6);

        // OnClickListener for Button1
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainDetailsActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        // OnClickListener for Button5
        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainDetailsActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        // OnClickListener for Button6
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainDetailsActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    // Handle toolbar item selection
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_sign_out) {
            signOut();
            return true;
        } else if (id == android.R.id.home) {
            onBackPressed();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    // Method to sign out and redirect to SignInActivity
    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    // Callback method when train data is received from the API
    @Override
    public void onTrainDataReceived(List<Train> trainList) {
        // Initialize the adapter and set it to the RecyclerView
        trainListAdapter = new TrainListAdapter(this, trainList);
        recyclerView.setAdapter(trainListAdapter);
    }

    // Callback method when an error occurs while fetching train data
    @Override
    public void onError(String errorMessage) {
        Log.e("TrainListActivity", errorMessage);
    }
}