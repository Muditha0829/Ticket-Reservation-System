package com.example.trainbooking_mobileapp.trainbookingmanagement;

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

import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.usermanagement.ProfileActivity;
import com.example.trainbooking_mobileapp.usermanagement.SignInActivity;

public class TrainBookingViewActivity extends AppCompatActivity {

    private TextView mainPassengerNameTextText, nicTextText, trainNameTextText, departureStationTextText,
            destinationStationTextText, totalPassengersTextText, ticketClassTextText, emailTextText, contactNumberTextText, reservationDateTextText, bookingDateTextText;
    private TrainBooking reservation;

    private Toolbar toolbar;
    private String userID;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation_view);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Reservation Details");

        reservation = (TrainBooking) getIntent().getSerializableExtra("reservation");

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

        userID = getIntent().getStringExtra("userID");

        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingViewActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingViewActivity.this, ProfileActivity.class);
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

//    private void updateReservation() {
//        // Retrieve updated data from TextText fields
//        String mainPassengerName = mainPassengerNameTextText.getText().toString();
//        String nic = nicTextText.getText().toString();
////        String trainNumber = trainNumberTextText.getText().toString();
//        String trainName = trainNameTextText.getText().toString();
//        String departureStation = departureStationTextText.getText().toString();
//        String destinationStation = destinationStationTextText.getText().toString();
//        int totalPassengers = Integer.parseInt(totalPassengersTextText.getText().toString());
//        String ticketClass = ticketClassTextText.getText().toString();
////        String totalPrice = totalPriceTextText.getText().toString();
//        String email = emailTextText.getText().toString();
//        String phone = contactNumberTextText.getText().toString();
//        String reservationDate = reservationDateTextText.getText().toString();
//
////        TrainBooking updatedReservation = new TrainBooking(reservation.getID(), travelerName, nic, reservation.getUserId(), TrainID, reservation.getBookingStatus(),
////                departureLocation, destinationLocation, numPassengers, age, ticketClass, seatSelection, email, phone, reservationDate, reservation.getBookingDate(), reservation.getFormattedReservationDate(), reservation.getFormattedBookingDate());
//
//        TrainBooking updatedReservation = new TrainBooking(reservation.getBookingID(), reservation.getTrainNumber(), trainName, userID, reservation.getBookingDate(),
//                reservationDate, totalPassengers, mainPassengerName, phone, departureStation, destinationStation, email, nic, ticketClass, totalPrice);
//
//
//        TrainBookingApiClient.updateReservationInAPI(updatedReservation, new TrainBookingApiClient.OnReservationUpdatedListener() {
//            @Override
//            public void onReservationUpdated() {
//                setResult(RESULT_OK);
//                finish();
//            }
//
//            @Override
//            public void onError(String errorMessage) {
//                Toast.makeText(TrainBookingViewActivity.this, "Error updating reservation", Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
}