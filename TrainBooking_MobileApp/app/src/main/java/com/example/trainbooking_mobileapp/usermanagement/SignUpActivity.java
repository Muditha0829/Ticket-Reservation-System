package com.example.trainbooking_mobileapp.usermanagement;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.trainbooking_mobileapp.R;
import com.google.gson.Gson;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class SignUpActivity extends AppCompatActivity {

    private EditText etFirstName, etLastName, etEmail, etNIC, etUserName, etPassword, etRePassword, etContactNumber;
    private Button btnSignUp;
    Spinner spinnerGender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        etFirstName = findViewById(R.id.etFirstName);
        etLastName = findViewById(R.id.etLastName);
        etEmail = findViewById(R.id.etEmail);
        etNIC = findViewById(R.id.etNIC);
        spinnerGender = findViewById(R.id.spinnerGender);
        etUserName = findViewById(R.id.etUserName);
        etPassword = findViewById(R.id.etPassword);
        etRePassword = findViewById(R.id.etRePassword);
        etContactNumber = findViewById(R.id.etContactNumber);
        btnSignUp = findViewById(R.id.btnSignUp);

        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signUp();
            }
        });

        TextView txtSignIn = findViewById(R.id.txtSignIn);
        txtSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SignUpActivity.this, SignInActivity.class);
                startActivity(intent);
                finish();
            }
        });

        // Get the Spinner
        Spinner spinnerGender = findViewById(R.id.spinnerGender);

// Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.gender_array, R.layout.custom_spinner_dropdown_item);

// Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

// Apply the adapter to the spinner
        spinnerGender.setAdapter(adapter);
    }

    private void signUp() {
        String firstName = etFirstName.getText().toString().trim();
        String lastName = etLastName.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String nic = etNIC.getText().toString().trim();
        String gender = spinnerGender.getSelectedItem().toString();
        String username = etUserName.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String reenteredPassword = etRePassword.getText().toString().trim();
        String contactNumber = etContactNumber.getText().toString().trim();

        // Hash the passwords
//        String hashedPassword = hashPassword(password);
//        String hashedReenteredPassword = hashPassword(reenteredPassword);

//        if (!hashedPassword.equals(hashedReenteredPassword)) {
//            // Passwords don't match
//            Toast.makeText(SignUpActivity.this, "Passwords do not match.", Toast.LENGTH_SHORT).show();
//            return; // Return without attempting to sign up
//        }

        User user = new User("", firstName, lastName, username, email, nic, gender, contactNumber, "", password, reenteredPassword, "");

        Log.d("SignUpActivity","firstName" + firstName);
        Log.d("SignUpActivity","nic" + nic);
        Log.d("SignUpActivity","password" + password);
        Log.d("SignUpActivity","reenteredPassword" + reenteredPassword);

        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody requestBody = RequestBody.create(JSON, new Gson().toJson(user));

        Request request = new Request.Builder()
                .url("http://pasinduperera-001-site1.atempurl.com/api/users/signup")
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                Log.e("SignUpActivity", "Error during sign up: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    Log.d("SignUpActivity", "Sign up successful!");

                    final String responseData = response.body().string();
                    SignUpActivity.this.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            Toast.makeText(SignUpActivity.this, "Sign up successful!", Toast.LENGTH_SHORT).show();

                            Intent intent = new Intent(SignUpActivity.this, SignInActivity.class);
                            startActivity(intent);
                            finish();
                        }
                    });

                } else {

                    final String errorResponse = response.body().string();
                    SignUpActivity.this.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            Toast.makeText(SignUpActivity.this, "Sign up failed: " + errorResponse, Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });

        Log.d("SignUpActivity", "Attempting to sign up...");
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(password.getBytes());
            StringBuilder hashString = new StringBuilder();

            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) hashString.append('0');
                hashString.append(hex);
            }

            return hashString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return null;
    }
}