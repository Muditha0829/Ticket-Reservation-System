package com.example.trainbooking_mobileapp.UserManagement;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class UserProfileActivity extends AppCompatActivity {

    // Declare TextViews
    private TextView nicTextView;
    private TextView firstNameTextView;
    private TextView lastNameTextView;
    private TextView emailTextView;
    private TextView genderTextView;
    private TextView usernameTextView;
    private TextView contactNumberTextView;

    // Declare User and Toolbar
    private User user;
    private Toolbar toolbar;

    // Declare userID
    private String userID;

    // Method for setting up the activity
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_profile);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        setTitle("My Profile");

        getSupportActionBar().setDisplayHomeAsUpEnabled(false);

        userID = getIntent().getStringExtra("userID");

        Button updateButton = findViewById(R.id.updateButton);
        Button deactivateButton = findViewById(R.id.deactivateButton);

// Initialize and set up TextViews and Buttons
        nicTextView = findViewById(R.id.nicTextView);
        firstNameTextView = findViewById(R.id.firstNameTextView);
        lastNameTextView = findViewById(R.id.lastNameTextView);
        usernameTextView = findViewById(R.id.usernameTextView);
        emailTextView = findViewById(R.id.emailTextView);
        genderTextView = findViewById(R.id.genderTextView);
        contactNumberTextView = findViewById(R.id.contactNumberTextView);

        new FetchUserDataTask().execute(userID);

        // Set click listeners for buttons
        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (user != null) {
                    Intent intent = new Intent(UserProfileActivity.this, UpdateUserProfileActivity.class);
                    intent.putExtra("user", user);
                    startActivityForResult(intent, 1001);
                } else {
                    Toast.makeText(UserProfileActivity.this, "User data not available", Toast.LENGTH_SHORT).show();
                }
            }
        });

        deactivateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (user != null) {
                    new DeactivateUserTask().execute(userID);
                } else {
                    Toast.makeText(UserProfileActivity.this, "User data not available", Toast.LENGTH_SHORT).show();
                }
            }
        });

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button5 = findViewById(R.id.button5);
        ImageButton Button6 = findViewById(R.id.button6);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserProfileActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);

            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserProfileActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserProfileActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    // Method for handling options menu items
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

    // Method for signing out
    private void signOut() {

        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    // AsyncTask for deactivating a user
    private class DeactivateUserTask extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String userID = params[0];
            Log.d("DeactivateUserTask", "Userid: " + userID);
            return deactivateUser(userID);
        }

        @Override
        protected void onPostExecute(String response) {
            if (response != null && response.equals("Success")) {
                Toast.makeText(UserProfileActivity.this, "User deactivated successfully", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(UserProfileActivity.this, SignInActivity.class);
                startActivity(intent);
            } else {
                Toast.makeText(UserProfileActivity.this, "Error deactivating user", Toast.LENGTH_SHORT).show();
            }
        }
    }

    // Method for deactivating a user
    private String deactivateUser(String userID) {
        try {
            URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/users/updateuserstatus/" + userID);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("PUT");
            connection.setRequestProperty("Content-Type", "application/json");

            JSONObject jsonStatusData = new JSONObject();
            jsonStatusData.put("UserStatus", "Deactive");

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(jsonStatusData.toString().getBytes("UTF-8"));
            outputStream.close();

            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                return "Success";
            } else {
                return "Error. Response code: " + responseCode;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error. Exception: " + e.getMessage();
        }
    }

    // AsyncTask for fetching user data
    private class FetchUserDataTask extends AsyncTask<String, Void, JSONObject> {
        @Override
        protected JSONObject doInBackground(String... params) {
            OkHttpClient client = new OkHttpClient();
            String userID = params[0];
            String apiUrl = "http://pasinduperera-001-site1.atempurl.com/api/users/getuser/" + userID;

            Request request = new Request.Builder()
                    .url(apiUrl)
                    .get()
                    .build();
            try {
                Response response = client.newCall(request).execute();
                if (response.isSuccessful()) {
                    String responseData = response.body().string();
                    return new JSONObject(responseData);
                }
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
            return null;
        }

        // Handling the result of an activity
        @Override
        protected void onPostExecute(JSONObject userData) {
            if (userData != null) {
                try {
                    String userID = userData.getString("UserID");
                    String firstName = userData.getString("FirstName");
                    String lastName = userData.getString("LastName");
                    String username = userData.getString("UserName");
                    String email = userData.getString("Email");
                    String NIC = userData.getString("NIC");
                    String gender = userData.getString("Gender");
                    String contactNumber = userData.getString("ContactNumber");

                    user = new User( userID, firstName, lastName, username, email, NIC, gender, contactNumber, "", "", "", "");

                    firstNameTextView.setText("First Name: " + firstName);
                    lastNameTextView.setText("Last Name: " + lastName);
                    usernameTextView.setText("User Name: " + username);
                    emailTextView.setText("Email: " + email);
                    nicTextView.setText("NIC: " + NIC);
                    genderTextView.setText("Gender: " + gender);
                    contactNumberTextView.setText("Contact Number: " + contactNumber);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            } else {
                Toast.makeText(UserProfileActivity.this, "Error fetching user data", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1001 && resultCode == RESULT_OK) {
            String userID = getIntent().getStringExtra("userID");
            new FetchUserDataTask().execute(userID);
        }
    }
}