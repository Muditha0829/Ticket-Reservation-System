package com.example.trainbooking_mobileapp.ReservationManagement;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
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
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.UserManagement.UserProfileActivity;
import com.example.trainbooking_mobileapp.UserManagement.SignInActivity;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;

public class CreateReservationActivity extends AppCompatActivity {

    private EditText editTextMainPassengerName;
    private EditText editTextNIC;
    private EditText editTextDepartureStation;
    private EditText editTextDestinationStation;
    private EditText editTextEmail;
    private EditText editTextPhone;
    private EditText editTextTotalPassengers;
    private TextView textviewReservationDate;
    private Toolbar toolbar;
    private Spinner ticketClassSpinner;
    private Spinner trainNameSpinner;
    private String userID;
    private ReservationApiClient trainBookingApiClient;

    // Method for checking if the provided email is valid
    private boolean isValidEmail(String email) {
        String emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(emailPattern);
    }

    // Method for checking if the provided NIC is valid
    private boolean isValidNIC(String nic) {
        String nicPattern = "^\\d{12}$";
        return nic.matches(nicPattern);
    }

    // Method for checking if the provided contact number is valid
    private boolean isValidContactNumber(String contactNumber) {
        String contactNumberPattern = "^\\d{10}$";
        return contactNumber.matches(contactNumberPattern);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_rservation);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Add Reservation");

        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        editTextMainPassengerName = findViewById(R.id.editTextMainPassengerName);
        editTextNIC = findViewById(R.id.editTextNIC);
        trainNameSpinner = findViewById(R.id.trainNameSpinner);
        editTextDepartureStation = findViewById(R.id.editTextDepartureStation);
        editTextDestinationStation = findViewById(R.id.editTextDestinationStation);
        editTextTotalPassengers = findViewById(R.id.editTextTotalPassengers);
        ticketClassSpinner = findViewById(R.id.ticketClassSpinner);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPhone = findViewById(R.id.editTextPhone);
        textviewReservationDate = findViewById(R.id.editTextReservationDate);

        Button buttonSubmitReservation = findViewById(R.id.buttonSubmitReservation);
        buttonSubmitReservation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createReservation();
            }
        });

        userID = getIntent().getStringExtra("userID");
        Log.d("ReservationActivity", "Received userID: " + userID);

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button6 = findViewById(R.id.button6);
        ImageButton Button5 = findViewById(R.id.button5);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CreateReservationActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CreateReservationActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CreateReservationActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });


        ImageButton calendarButton = findViewById(R.id.calendarButton);
        calendarButton.setOnClickListener(new View.OnClickListener() {
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


        trainBookingApiClient = new ReservationApiClient();

        Spinner trainNameSpinner = findViewById(R.id.trainNameSpinner);

        trainBookingApiClient.getTrains(new ReservationApiClient.OnTrainNamesReceivedListener() {
            @Override
            public void onTrainNamesReceived(List<String> trainNames) {
                // Create an ArrayAdapter and set it to the spinner
                ArrayAdapter<String> adapter = new ArrayAdapter<>(CreateReservationActivity.this, android.R.layout.simple_spinner_item, trainNames);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                trainNameSpinner.setAdapter(adapter);
            }
            @Override
            public void onError(String errorMessage) {
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

    // Method for showing the date picker dialog
    private void showDatePickerDialog() {
        DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                        // Handle the selected date
                        String formattedDate = String.format("%04d-%02d-%02d", year, monthOfYear + 1, dayOfMonth);
                        textviewReservationDate.setText(formattedDate);
                    }
                },
                2023, 9, 17
        );
        datePickerDialog.show();
    }

    // Method for signing out
    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    // Method for creating a reservation
    private void createReservation() {
        String mainPassengerName = editTextMainPassengerName.getText().toString();
        String nic = editTextNIC.getText().toString();
        String userID = getIntent().getStringExtra("userID");
        String totalPassengersString = editTextTotalPassengers.getText().toString();
        String departureStation = editTextDepartureStation.getText().toString();
        String destinationStation = editTextDestinationStation.getText().toString();
        String bookingStatus = "Active";
        String email = editTextEmail.getText().toString();
        String phone = editTextPhone.getText().toString();
        String reservationDate = textviewReservationDate.getText().toString();
        LocalDateTime currentDateTime = LocalDateTime.now();
        String bookingDate = currentDateTime.toString();

        if (!isValidEmail(email)) {
            Toast.makeText(CreateReservationActivity.this, "Invalid email format.", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!isValidNIC(nic)) {
            Toast.makeText(CreateReservationActivity.this, "Invalid NIC format.", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!isValidContactNumber(phone)) {
            Toast.makeText(CreateReservationActivity.this, "Invalid contact number format.", Toast.LENGTH_SHORT).show();
            return;
        }

        Log.d("ReservationActivity", "booking Date: " + bookingDate);

        String ticketClass = ticketClassSpinner.getSelectedItem().toString();

        int totalPassengers = Integer.parseInt(totalPassengersString);
        String trainName = trainNameSpinner.getSelectedItem().toString();

        Reservation reservation = new Reservation(null, "", trainName, userID, bookingDate,
                reservationDate, totalPassengers, mainPassengerName, phone, departureStation, destinationStation, email, nic, ticketClass, "");

        CreateReservationTask task = new CreateReservationTask(userID);
        task.execute(reservation);

        Log.d("ReservationActivity", "Reservation: " + reservation);
    }

    // AsyncTask class for creating a reservation in the background
    private class CreateReservationTask extends AsyncTask<Reservation, Void, String> {
        private String userID;

        public CreateReservationTask(String userID) {
            this.userID = userID;
        }

        @Override
        protected String doInBackground(Reservation... reservations) {
            Reservation reservation = reservations[0];
            try {
                URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/trainbooking/createticketbooking");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
                connection.setRequestProperty("Accept","application/json");
                connection.setDoOutput(true);

                reservation.setUserID(userID);

                Gson gson = new Gson();
                String jsonInputString = gson.toJson(reservation);
                Log.d("ReservationActivity", "jsonInputString: " + jsonInputString);
                OutputStream os = connection.getOutputStream();
                os.write(jsonInputString.getBytes("utf-8"));

                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }

                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String response) {
            if (response != null) {
                Log.d("ReservationActivity", "Reservation created successfully. Response: " + response);
                Toast.makeText(CreateReservationActivity.this, "Reservation created successfully!", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(CreateReservationActivity.this, ReservationDetailsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            } else {
                Log.e("ReservationActivity", "Error creating reservation.");
                Toast.makeText(CreateReservationActivity.this, "Reservation date must be within 30 days from the your booking date and only add 4 reservations in one nic.", Toast.LENGTH_SHORT).show();
            }
        }
    }
}