package com.example.trainbooking_mobileapp.ReservationManagement;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.UserManagement.UserProfileActivity;
import com.example.trainbooking_mobileapp.UserManagement.SignInActivity;

public class ReservationViewActivity extends AppCompatActivity {

    private TextView mainPassengerNameTextText, nicTextText, trainNameTextText, departureStationTextText,
            destinationStationTextText, totalPassengersTextText, ticketClassTextText, emailTextText, contactNumberTextText, reservationDateTextText, bookingDateTextText;
    private Reservation reservation;

    private Toolbar toolbar;
    private String userID;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation_view);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Reservation Details");

        reservation = (Reservation) getIntent().getSerializableExtra("reservation");

        mainPassengerNameTextText = findViewById(R.id.mainPassengerNameTextText);
        nicTextText = findViewById(R.id.nicTextText);
        trainNameTextText = findViewById(R.id.trainNameTextText);
        departureStationTextText = findViewById(R.id.departureStationTextText);
        destinationStationTextText = findViewById(R.id.destinationStationTextText);
        totalPassengersTextText = findViewById(R.id.totalPassengersTextText);
        ticketClassTextText = findViewById(R.id.ticketClassTextText);
        emailTextText = findViewById(R.id.emailTextText);
        contactNumberTextText = findViewById(R.id.contactNumberTextText);
        reservationDateTextText = findViewById(R.id.reservationDateTextText);

        populateFields();

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button5 = findViewById(R.id.button5);
        ImageButton Button6 = findViewById(R.id.button6);
        userID = getIntent().getStringExtra("userID");

        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReservationViewActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReservationViewActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReservationViewActivity.this, AboutUsActivity.class);
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

    private void populateFields() {
        mainPassengerNameTextText.setText(reservation.getMainPassengerName());
        nicTextText.setText(reservation.getNIC());
        trainNameTextText.setText(reservation.getTrainName());
        departureStationTextText.setText(reservation.getDepartureStation());
        destinationStationTextText.setText(reservation.getDestinationStation());
        totalPassengersTextText.setText(String.valueOf(reservation.getTotalPassengers()));
        ticketClassTextText.setText(reservation.getTicketClass());
        emailTextText.setText(reservation.getEmail());
        contactNumberTextText.setText(reservation.getContactNumber());
        reservationDateTextText.setText(reservation.getReservationDate());
    }
}