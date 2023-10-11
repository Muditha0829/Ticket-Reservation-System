package com.example.trainbooking_mobileapp.TrainManagement;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.util.Log;

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

    private static final String API_URL = "http://pasinduperera-001-site1.atempurl.com/api/trains/getalltrains";

    public interface OnTrainDataReceivedListener {
        void onTrainDataReceived(List<Train> trainList);
        void onError(String errorMessage);
    }

    public void getActiveTrainsFromAPI(final OnTrainDataReceivedListener listener) {
        @SuppressLint("StaticFieldLeak") AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
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

        task.execute();
    }

    private List<Train> parseJson(String json) throws JSONException {
        List<Train> trainList = new ArrayList<>();

        JSONArray jsonArray = new JSONArray(json);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);

            String TrainID = jsonObject.getString("TrainID");
            Log.d("TrainDetails", "TrainID: " + TrainID);

            String trainName = jsonObject.getString("TrainName");
            Log.d("TrainDetails", "TrainName: " + trainName);

            String departureTime = jsonObject.getString("FormattedDepartureTime");
            Log.d("TrainDetails", "DepartureTime: " + departureTime);

            String arrivalTime = jsonObject.getString("FormattedArrivalTime");
            Log.d("TrainDetails", "ArrivalTime: " + arrivalTime);

            String departureStation = jsonObject.getString("DepartureStation");
            Log.d("TrainDetails", "DepartureStation: " + departureStation);

            String arrivalStation = jsonObject.getString("ArrivalStation");
            Log.d("TrainDetails", "ArrivalStation: " + arrivalStation);

            String firstClassTicketPrice = jsonObject.getString("FirstClassTicketPrice");
            String secondClassTicketPrice = jsonObject.getString("SecondClassTicketPrice");
            String thirdClassTicketPrice = jsonObject.getString("ThirdClassTicketPrice");

            String status = jsonObject.getString("TrainStatus");
            Log.d("TrainDetails", "TrainStatus: " + status);

            Train train = new Train(TrainID, trainName, departureTime, arrivalTime, departureStation, arrivalStation, firstClassTicketPrice, secondClassTicketPrice, thirdClassTicketPrice, status);
            trainList.add(train);

            Log.d("TrainApiClient","Train" + train);
        }

        return trainList;
    }
}