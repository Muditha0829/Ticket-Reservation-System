package com.example.trainbooking_mobileapp.UserManagement;

import android.os.AsyncTask;
import android.util.Log;
import org.json.JSONObject;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

public class UserApiClient {

    // API endpoint URL
    private static final String API_URL = "http://pasinduperera-001-site1.atempurl.com/api/users/getallusers";

    // Interface for receiving user data
    public interface OnUserDataReceivedListener {
        void onUserDataReceived(List<User> userList);
        void onError(String errorMessage);
    }

    // Method for updating user data in API
    public static void updateUserInAPI(final User user, final OnUserUpdatedListener listener) {
        AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    // Create a URL object for the update user endpoint
                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/users/updateuser/" + user.getID());
                    Log.d("UpdateUserActivity", "Url: " + url);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("PUT");
                    connection.setRequestProperty("Content-Type", "application/json");

                    // Create a JSON object with updated user data
                    JSONObject requestBody = new JSONObject();
                    requestBody.put("FirstName", user.getFirstName());
                    requestBody.put("LastName", user.getLastName());
                    requestBody.put("UserName", user.getUserName());
                    requestBody.put("email", user.getEmail());
                    requestBody.put("Gender", user.getGender());
                    requestBody.put("ContactNumber", user.getContactNumber());

                    // Enable output for sending data
                    connection.setDoOutput(true);
                    OutputStream os = connection.getOutputStream();
                    os.write(requestBody.toString().getBytes("UTF-8"));
                    os.close();

                    int responseCode = connection.getResponseCode();

                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        return "Success";
                    } else {
                        return "Error";
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return "Error: " + e.getMessage();
                }
            }

            @Override
            protected void onPostExecute(String response) {
                if (response != null && response.equals("Success")) {
                    listener.onUserUpdated();
                } else {
                    listener.onError("Error updating user");
                }
            }
        };

        task.execute();
    }

    // Interface for user update callbacks
    public interface OnUserUpdatedListener {
        void onUserUpdated();
        void onError(String errorMessage);
    }
}