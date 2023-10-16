package com.example.trainbooking_mobileapp.TrainManagement;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class TrainApiClient {

    // URL for fetching train data from the API
    private static final String API_URL = "http://pasinduperera-001-site1.atempurl.com/api/trains/getalltrains";

    // Listener interface for receiving train data or error messages
    public interface OnTrainDataReceivedListener {
        void onTrainDataReceived(List<Train> trainList);
        void onError(String errorMessage);
    }

    // Method to fetch active trains from the API
    public void getActiveTrainsFromAPI(final OnTrainDataReceivedListener listener) {
        // AsyncTask to perform network operation in the background
        @SuppressLint("StaticFieldLeak") AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    // Establish connection and read response
                    URL url = new URL(API_URL);
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                    StringBuilder stringBuilder = new StringBuilder();

                    String line;
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    return stringBuilder.toString();
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            protected void onPostExecute(String response) {
                if (response != null) {
                    try {
                        // Parse JSON and notify listener with train data
                        List<Train> trainList = parseJson(response);
                        listener.onTrainDataReceived(trainList);
                    } catch (JSONException e) {
                        e.printStackTrace();
                        listener.onError("Error parsing JSON");
                    }
                } else {
                    listener.onError("Error fetching data from API");
                }
            }
        };

        task.execute(); // Execute the AsyncTask
    }

    // Method to parse JSON response into a list of Train objects
    private List<Train> parseJson(String json) throws JSONException {
        List<Train> trainList = new ArrayList<>();

        JSONArray jsonArray = new JSONArray(json);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            // Extract train information from JSON
            String TrainID = jsonObject.getString("TrainID");
            String trainName = jsonObject.getString("TrainName");
            String departureTime = jsonObject.getString("FormattedDepartureTime");
            String arrivalTime = jsonObject.getString("FormattedArrivalTime");
            String departureStation = jsonObject.getString("DepartureStation");
            String arrivalStation = jsonObject.getString("ArrivalStation");
            String firstClassTicketPrice = jsonObject.getString("FirstClassTicketPrice");
            String secondClassTicketPrice = jsonObject.getString("SecondClassTicketPrice");
            String thirdClassTicketPrice = jsonObject.getString("ThirdClassTicketPrice");
            String status = jsonObject.getString("TrainStatus");
            // Create Train object and add to the list
            Train train = new Train(TrainID, trainName, departureTime, arrivalTime, departureStation, arrivalStation, firstClassTicketPrice, secondClassTicketPrice, thirdClassTicketPrice, status);
            trainList.add(train);
        }
        return trainList;
    }
}