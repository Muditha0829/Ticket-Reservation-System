package com.example.trainbooking_mobileapp.trainbookingmanagement;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.AsyncTask;
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
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import com.example.trainbooking_mobileapp.usermanagement.ProfileActivity;
import com.example.trainbooking_mobileapp.usermanagement.SignInActivity;
import com.example.trainbooking_mobileapp.usermanagement.SignUpActivity;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;

public class TrainBookingActivity extends AppCompatActivity {

    private EditText editTextMainPassengerName;
    private EditText editTextNIC;
    private EditText editTextDepartureStation;
    private EditText editTextDestinationStation;
    private EditText editTextEmail;
    private EditText editTextPhone;
    private TextView textviewReservationDate;
    private Toolbar toolbar;
    private Spinner ticketClassSpinner;
    private Spinner totalPassengersSpinner, trainNameSpinner;
    private String userID;
    private TrainBookingApiClient trainBookingApiClient;
    private Double firstClassTicketPrice;
    private Double secondClassTicketPrice;
    private Double thirdClassTicketPrice;

    private boolean isValidEmail(String email) {
        String emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(emailPattern);
    }

    private boolean isValidNIC(String nic) {
        String nicPattern = "^\\d{12}$";
        return nic.matches(nicPattern);
    }

    private boolean isValidContactNumber(String contactNumber) {
        String contactNumberPattern = "^\\d{10}$";
        return contactNumber.matches(contactNumberPattern);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.reservation_layout);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("Add Reservation");

        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        editTextMainPassengerName = findViewById(R.id.editTextMainPassengerName);
        editTextNIC = findViewById(R.id.editTextNIC);
        trainNameSpinner = findViewById(R.id.trainNameSpinner);
        editTextDepartureStation = findViewById(R.id.editTextDepartureStation);
        editTextDestinationStation = findViewById(R.id.editTextDestinationStation);
        totalPassengersSpinner = findViewById(R.id.totalPassengersSpinner);
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
                Intent intent = new Intent(TrainBookingActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingActivity.this, ProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TrainBookingActivity.this, AboutUsActivity.class);
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

        Spinner spinnerTicketClass = findViewById(R.id.totalPassengersSpinner);
        ArrayAdapter<CharSequence> adaptertwo = ArrayAdapter.createFromResource(this, R.array.total_passengers, android.R.layout.simple_spinner_item);
        adaptertwo.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerTicketClass.setAdapter(adaptertwo);


        trainBookingApiClient = new TrainBookingApiClient();

        Spinner trainNameSpinner = findViewById(R.id.trainNameSpinner);

        trainBookingApiClient.getTrains(new TrainBookingApiClient.OnTrainNamesReceivedListener() {
            @Override
            public void onTrainNamesReceived(List<String> trainNames) {
                // Create an ArrayAdapter and set it to the spinner
                ArrayAdapter<String> adapter = new ArrayAdapter<>(TrainBookingActivity.this, android.R.layout.simple_spinner_item, trainNames);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                trainNameSpinner.setAdapter(adapter);
            }
            @Override
            public void onError(String errorMessage) {
            }
        });

    }

//    private void fetchTicketPrices() {
//        trainBookingApiClient.getTicketPrices(new TrainBookingApiClient.OnTicketPricesReceivedListener() {
//            @Override
//            public void onTicketPricesReceived(Double firstClassPrice, Double secondClassPrice, Double thirdClassPrice) {
//                firstClassTicketPrice = firstClassPrice;
//                secondClassTicketPrice = secondClassPrice;
//                thirdClassTicketPrice = thirdClassPrice;
//            }
//
//            @Override
//            public void onError(String errorMessage) {
//            }
//        });
//    }

//    private Double getTicketClassPrice(String ticketClass) {
//        switch (ticketClass) {
//            case "First Class":
//                return firstClassTicketPrice;
//            case "Second Class":
//                return secondClassTicketPrice;
//            case "Third Class":
//                return thirdClassTicketPrice;
//            default:
//                return null; // Handle if ticket class is not recognized
//        }
//    }

//    private String calculateTotalPrice() {
//        String ticketClass = ticketClassSpinner.getSelectedItem().toString();
//        int totalPassengers = Integer.parseInt(totalPassengersSpinner.getSelectedItem().toString());
//
//        Double ticketClassPrice = getTicketClassPrice(ticketClass);
//
//        if (ticketClassPrice != null) {
//            Double totalPrice = totalPassengers * ticketClassPrice;
//            return String.valueOf(totalPrice);
//        }
//
//        return "N/A"; // Handle if ticket class price is not available
//    }

//    private void updateTotalPriceField() {
//        String totalPrice = calculateTotalPrice();
//        editTextTotalPrice.setText(totalPrice);
//    }

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
                // Set the initial date (optional)
                2023, 9, 17 // Year, month (0-based), day
        );
        datePickerDialog.show();
    }



    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish(); // Optional: Close the current activity if needed
    }

    // Inside your TrainBookingActivity class

//    private void loadTrainNames() {
//        TrainBookingApiClient apiClient = new TrainBookingApiClient();
//        apiClient.getTrainNamesFromAPI(new TrainBookingApiClient.OnTrainNamesReceivedListener() {
//            @Override
//            public void onTrainNamesReceived(List<String> trainNames) {
//                // Populate train names in your EditText or any other UI component
//                // For example, assuming you have an EditText named editTextTrainName:
//                ArrayAdapter<String> adapter = new ArrayAdapter<>(TrainBookingActivity.this, android.R.layout.simple_spinner_item, trainNames);
//                editTextTrainName.setAdapter(adapter);
//            }
//
//            @Override
//            public void onError(String errorMessage) {
//                // Handle errors, e.g., show an error message to the user
//                Toast.makeText(TrainBookingActivity.this, "Error fetching train names: " + errorMessage, Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
//
//    // Call this method when you want to load train names, e.g., in your onCreate method
//    loadTrainNames();


    private void createReservation() {
        String mainPassengerName = editTextMainPassengerName.getText().toString();
        String nic = editTextNIC.getText().toString();
        String userID = getIntent().getStringExtra("userID");
        String departureStation = editTextDepartureStation.getText().toString();
        String destinationStation = editTextDestinationStation.getText().toString();
        String bookingStatus = "Active";
        String email = editTextEmail.getText().toString();
        String phone = editTextPhone.getText().toString();
        String reservationDate = textviewReservationDate.getText().toString();
        LocalDateTime currentDateTime = LocalDateTime.now();
        String bookingDate = currentDateTime.toString();

        if (!isValidEmail(email)) {
            Toast.makeText(TrainBookingActivity.this, "Invalid email format.", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!isValidNIC(nic)) {
            Toast.makeText(TrainBookingActivity.this, "Invalid NIC format.", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!isValidContactNumber(phone)) {
            Toast.makeText(TrainBookingActivity.this, "Invalid contact number format.", Toast.LENGTH_SHORT).show();
            return;
        }

        Log.d("ReservationActivity", "booking Date: " + bookingDate);

        String ticketClass = ticketClassSpinner.getSelectedItem().toString();
        String totalPassengersString = totalPassengersSpinner.getSelectedItem().toString();
        int totalPassengers = Integer.parseInt(totalPassengersString);
        String trainName = trainNameSpinner.getSelectedItem().toString();

        TrainBooking reservation = new TrainBooking(null, "", trainName, userID, bookingDate,
                reservationDate, totalPassengers, mainPassengerName, phone, departureStation, destinationStation, email, nic, ticketClass, "");

        CreateReservationTask task = new CreateReservationTask(userID);
        task.execute(reservation);

        Log.d("ReservationActivity", "Reservation: " + reservation);
    }

    private class CreateReservationTask extends AsyncTask<TrainBooking, Void, String> {
        private String userID;

        public CreateReservationTask(String userID) {
            this.userID = userID;
        }

        @Override
        protected String doInBackground(TrainBooking... reservations) {
            TrainBooking reservation = reservations[0];
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
                Toast.makeText(TrainBookingActivity.this, "Reservation created successfully!", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(TrainBookingActivity.this, TrainBookingDetailActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            } else {
                Log.e("ReservationActivity", "Error creating reservation.");
                Toast.makeText(TrainBookingActivity.this, "Reservation date must be within 30 days from the your booking date.", Toast.LENGTH_SHORT).show();
            }
        }
    }
}