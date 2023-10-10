package com.example.trainbooking_mobileapp.trainbookingmanagement;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.usermanagement.ProfileActivity;
import com.example.trainbooking_mobileapp.usermanagement.SignInActivity;

import java.util.List;

public class UpdateTrainBookingActivity extends AppCompatActivity {

    private EditText mainPassengerNameEditText, nicEditText, departureStationEditText,
            destinationStationEditText,
            emailEditText, contactNumberEditText;
    private TextView reservationDateTextView;
    private Button updateButton;
    private TrainBooking reservation;

    private Toolbar toolbar;
    private String userID;

    private Spinner ticketClassSpinner, totalPassengersSpinner, trainNameSpinner;

    private TrainBookingApiClient trainBookingApiClient;

    @SuppressLint("LongLogTag")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_reservation);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Update Reservation");
        userID = getIntent().getStringExtra("userID");
        reservation = (TrainBooking) getIntent().getSerializableExtra("reservation");

        userID = getIntent().getStringExtra("userID");
        Log.d("ReservationDetailActivity", "Received userID: " + userID);

        mainPassengerNameEditText = findViewById(R.id.mainPassengerNameEditText);
        nicEditText = findViewById(R.id.nicEditText);
        trainNameSpinner = findViewById(R.id.trainNameSpinner);
        departureStationEditText = findViewById(R.id.departureStationEditText);
        destinationStationEditText = findViewById(R.id.destinationStationEditText);
        totalPassengersSpinner = findViewById(R.id.totalPassengersSpinner);
        ticketClassSpinner = findViewById(R.id.ticketClassSpinner);
        emailEditText = findViewById(R.id.emailEditText);
        contactNumberEditText = findViewById(R.id.contactNumberEditText);
        reservationDateTextView = findViewById(R.id.editTextReservationDate);
        updateButton = findViewById(R.id.updateButton);

        populateFields();

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateReservation();
            }
        });

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button5 = findViewById(R.id.button5);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UpdateTrainBookingActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UpdateTrainBookingActivity.this, ProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        reservationDateTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showDatePickerDialog();
            }
        });

        Spinner ticketClassSpinner = findViewById(R.id.ticketClassSpinner);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.ticket_classes, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ticketClassSpinner.setAdapter(adapter);

        Spinner spinnerTicketClass = findViewById(R.id.totalPassengersSpinner);
        ArrayAdapter<CharSequence> adaptertwo = ArrayAdapter.createFromResource(this, R.array.total_passengers, android.R.layout.simple_spinner_item);
        adaptertwo.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerTicketClass.setAdapter(adaptertwo);

        trainBookingApiClient = new TrainBookingApiClient();

        Spinner trainNameSpinner = findViewById(R.id.trainNameSpinner);

        trainBookingApiClient.getTrains(new TrainBookingApiClient.OnTrainNamesReceivedListener() {
            @Override
            public void onTrainNamesReceived(List<String> trainNames) {
                ArrayAdapter<String> adapter = new ArrayAdapter<>(UpdateTrainBookingActivity.this, android.R.layout.simple_spinner_item, trainNames);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                trainNameSpinner.setAdapter(adapter);
            }

            @Override
            public void onError(String errorMessage) {
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

    private DatePickerDialog.OnDateSetListener dateSetListener = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
            String formattedDate = String.format("%04d-%02d-%02d", year, monthOfYear + 1, dayOfMonth);
            reservationDateTextView.setText(formattedDate);
        }
    };

    private void showDatePickerDialog() {
        DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                dateSetListener,
                2023, 9, 17
        );
        datePickerDialog.show();
    }

    private void signOut() {
        Intent intentone = new Intent(this, SignInActivity.class);
        startActivity(intentone);
        finish();
    }

    private void populateFields() {
        mainPassengerNameEditText.setText(reservation.getMainPassengerName());
        nicEditText.setText(reservation.getNIC());
        departureStationEditText.setText(reservation.getDepartureStation());
        destinationStationEditText.setText(reservation.getDestinationStation());
        emailEditText.setText(reservation.getEmail());
        contactNumberEditText.setText(reservation.getContactNumber());
        reservationDateTextView.setText(reservation.getReservationDate());
    }

    private void updateReservation() {
        String mainPassengerName = mainPassengerNameEditText.getText().toString();
        String nic = nicEditText.getText().toString();
        String departureStation = departureStationEditText.getText().toString();
        String destinationStation = destinationStationEditText.getText().toString();
        String email = emailEditText.getText().toString();
        String contactNumber = contactNumberEditText.getText().toString();
        String reservationDate = reservationDateTextView.getText().toString();

        Log.d("Updateuser","userid3: " + reservation.getUserID());

        TrainBooking updatedReservation = new TrainBooking(reservation.getBookingID(), reservation.getTrainNumber(), reservation.getTrainName(), userID, reservation.getBookingDate(),
                reservationDate, reservation.getTotalPassengers(), mainPassengerName, contactNumber, departureStation, destinationStation, email, nic, reservation.getTicketClass(), reservation.getTotalPrice());

        TrainBookingApiClient.updateReservationInAPI(updatedReservation, new TrainBookingApiClient.OnReservationUpdatedListener() {
            @Override
            public void onReservationUpdated() {
                Intent intent = new Intent(UpdateTrainBookingActivity.this, TrainBookingDetailActivity.class);
                intent.putExtra("userID", userID);
                Log.d("Updateuser","userid4: " + userID);
                startActivity(intent);

                Toast.makeText(UpdateTrainBookingActivity.this, "Reservation updated successfully", Toast.LENGTH_SHORT).show();
                finish();
            }

            @Override
            public void onError(String errorMessage) {
                Toast.makeText(UpdateTrainBookingActivity.this, "You can only update reservations at least 5 days before the reservation date", Toast.LENGTH_SHORT).show();
            }
        });
    }
}