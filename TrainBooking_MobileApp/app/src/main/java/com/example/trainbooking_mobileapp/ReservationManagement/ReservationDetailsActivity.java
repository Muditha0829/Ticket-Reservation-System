package com.example.trainbooking_mobileapp.ReservationManagement;

import android.annotation.SuppressLint;
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

public class ReservationDetailsActivity extends AppCompatActivity implements ReservationApiClient.OnReservationDataReceivedListener {

    private RecyclerView recyclerView;
    private ReservationListAdapter reservationListAdapter;
    private ReservationApiClient reservationApiClient;
    private List<Reservation> reservationList;
    private Toolbar toolbar;
    private String userID;

    @SuppressLint("LongLogTag")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation_list);

        // Initialize the toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Set the title for this activity
        setTitle("Reservation History");

        // Disable the up button in the action bar
        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        // Find the RecyclerView for reservations
        recyclerView = findViewById(R.id.reservationRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Create an instance of ReservationApiClient
        reservationApiClient = new ReservationApiClient();

        // Get the user ID passed from the previous activity
        userID = getIntent().getStringExtra("userID");

        // Fetch reservations from the API
        reservationApiClient.getReservationsForUserFromAPI(userID, this);

        // Set click listeners for the ImageButtons
        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button6 = findViewById(R.id.button6);
        ImageButton Button5 = findViewById(R.id.button5);

        // Handle button clicks
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to the main activity
                Intent intent = new Intent(ReservationDetailsActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReservationDetailsActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReservationDetailsActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_sign_out) {
            signOut();
            return true;
        } else if (id == android.R.id.home) {
            // Handle the up button in the action bar
            onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onReservationDataReceived(List<Reservation> reservationList) {

        for (Reservation reservation : reservationList) {
        }

        reservationListAdapter = new ReservationListAdapter(this, reservationList);
        reservationListAdapter.setUserID(userID); // Set the userID in the adapter
        recyclerView.setAdapter(reservationListAdapter);
    }

    @Override
    public void onError(String errorMessage) {
        Log.e("ReservationListActivity", errorMessage);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1001 && resultCode == RESULT_OK) {
            Reservation updatedReservation = (Reservation) data.getSerializableExtra("updatedReservation");
            String updatedUserID = data.getStringExtra("userID");

            int position = reservationList.indexOf(updatedReservation);
            if (position != -1) {
                reservationList.set(position, updatedReservation);
                reservationListAdapter.notifyItemChanged(position);
                reservationListAdapter.setUserID(updatedUserID);
            }
        }
    }
}