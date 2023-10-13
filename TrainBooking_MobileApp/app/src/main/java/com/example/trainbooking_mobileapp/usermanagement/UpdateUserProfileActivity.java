package com.example.trainbooking_mobileapp.UserManagement;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.example.trainbooking_mobileapp.AboutUsActivity;
import com.example.trainbooking_mobileapp.MainActivity;
import com.example.trainbooking_mobileapp.R;

public class UpdateUserProfileActivity extends AppCompatActivity {

    // Declare EditText, Button, User, Toolbar, and String variables
    private EditText updatedUserNameEditText, updatedFirstNameEditText, updatedLastNameEditText, updatedPhoneNumberEditText, updatedEmailEditText, updatedGenderEditText;
    private Button updateButton;
    private User user;
    private Toolbar toolbar;
    private String userID;
    private  Spinner genderSpinner;

    // Validate email format
    private boolean isValidEmail(String email) {
        String emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(emailPattern);
    }

    // Validate contact number format
    private boolean isValidContactNumber(String contactNumber) {
        String contactNumberPattern = "^\\d{10}$";
        return contactNumber.matches(contactNumberPattern);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_user_profile);

        // Initialize UI elements and retrieve user information
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("Update Profile");
        user = (User) getIntent().getSerializableExtra("user");
        userID = getIntent().getStringExtra("userID");

        updatedFirstNameEditText = findViewById(R.id.updatedFirstNameEditText);
        updatedLastNameEditText = findViewById(R.id.updatedLastNameEditText);
        updatedUserNameEditText = findViewById(R.id.updatedUserNameEditText);
        updatedEmailEditText = findViewById(R.id.updatedEmailEditText);
        updatedPhoneNumberEditText = findViewById(R.id.updatedPhoneNumberEditText);
        updateButton = findViewById(R.id.updateButton);

        // Populate fields with user information
        populateFields();

        // Set click listeners for buttons and image buttons
        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateUser();
            }
        });

        String userID = getIntent().getStringExtra("userID");

        ImageButton Button1 = findViewById(R.id.button1);
        ImageButton Button5 = findViewById(R.id.button5);
        ImageButton Button6 = findViewById(R.id.button6);
        Button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UpdateUserProfileActivity.this, MainActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });

        Button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UpdateUserProfileActivity.this, UserProfileActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
        Button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UpdateUserProfileActivity.this, AboutUsActivity.class);
                intent.putExtra("userID", userID);
                startActivity(intent);
            }
        });
    }

    // Handle menu item selection
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

    // Sign out and navigate to sign in activity
    private void signOut() {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
        finish();
    }

    // Populate fields with user information
    private void populateFields() {
        String ID = user.getID();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String userName = user.getUserName();
        String email = user.getEmail();
        String contactNumber = user.getContactNumber();

        updatedFirstNameEditText.setText(firstName);
        updatedLastNameEditText.setText(lastName);
        updatedUserNameEditText.setText(userName);
        updatedEmailEditText.setText(email);
        updatedPhoneNumberEditText.setText(contactNumber);
    }

    // Update user information
    private void updateUser() {
        String firstName = updatedFirstNameEditText.getText().toString();
        String lastName = updatedLastNameEditText.getText().toString();
        String userName = updatedUserNameEditText.getText().toString();
        String email = updatedEmailEditText.getText().toString();
        String contactNumber = updatedPhoneNumberEditText.getText().toString();

        if (!isValidEmail(email)) {
            Toast.makeText(UpdateUserProfileActivity.this, "Invalid email format.", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!isValidContactNumber(contactNumber)) {
            Toast.makeText(UpdateUserProfileActivity.this, "Invalid contact number format.", Toast.LENGTH_SHORT).show();
            return;
        }

        User updatedUser = new User(user.getID(), firstName, lastName, userName, email, user.getNIC(), user.getGender(), contactNumber, user.getUserType(), user.getPassword(), user.getRePassword(), user.getUserStatus());

        UserApiClient.updateUserInAPI(updatedUser, new UserApiClient.OnUserUpdatedListener() {
            @Override
            public void onUserUpdated() {
                setResult(RESULT_OK);
                finish();
                Toast.makeText(UpdateUserProfileActivity.this, "User updated successfully", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(String errorMessage) {
                Toast.makeText(UpdateUserProfileActivity.this, "Error updating user", Toast.LENGTH_SHORT).show();
            }
        });
    }
}