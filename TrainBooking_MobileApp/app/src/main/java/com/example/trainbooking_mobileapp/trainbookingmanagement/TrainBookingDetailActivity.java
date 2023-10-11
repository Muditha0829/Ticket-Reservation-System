package com.example.trainbooking_mobileapp.trainbookingmanagement;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
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
import com.example.trainbooking_mobileapp.usermanagement.ProfileActivity;
import com.example.trainbooking_mobileapp.usermanagement.SignInActivity;

import java.util.List;

public class TrainBookingDetailActivity extends AppCompatActivity implements TrainBookingApiClient.OnReservationDataReceivedListener {

    private RecyclerView recyclerView;
    private TrainBookingListAdapter reservationListAdapter;
    private TrainBookingApiClient reservationApiClient;
    private List<TrainBooking> reservationList;
    private Toolbar toolbar;
    private String userID;

    @SuppressLint("LongLogTag")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation_list);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Reservation List");

        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        recyclerView = findViewById(R.id.reservationRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        reservationApiClient = new TrainBookingApiClient();

        userID = getIntent().getStringExtra("userID");
        Log.d("ReservationDetailActivity", "Send userID: " + userID);

        reservationApiClient.getReservationsForUserFromAPI(userID, this);

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button6 = findViewById(R.id.button6);
        ImageButton Button5 = findViewById(R.id.button5);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingDetailActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingDetailActivity.this, ProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingDetailActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.top_app_bar_menu, menu);
        return true;
    }

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

    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onReservationDataReceived(List<TrainBooking> reservationList) {
        Log.d("ReservationDetails", "Received: " + reservationList.size());

        for (TrainBooking reservation : reservationList) {
            Log.d("ReservationDetails", "Reservation ID: " + reservation.getBookingID());
        }

        reservationListAdapter = new TrainBookingListAdapter(this, reservationList);
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
            TrainBooking updatedReservation = (TrainBooking) data.getSerializableExtra("updatedReservation");
            String updatedUserID = data.getStringExtra("userID");
            Log.d("Updateuser","userid1: " + updatedUserID);

            int position = reservationList.indexOf(updatedReservation);
            if (position != -1) {
                reservationList.set(position, updatedReservation);
                reservationListAdapter.notifyItemChanged(position);
                reservationListAdapter.setUserID(updatedUserID);
            }
        }
    }
}