package com.example.trainbooking_mobileapp.trainbookingmanagement;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class TrainBookingApiClient {

    public interface OnTicketPricesReceivedListener {
        void onTicketPricesReceived(Double firstClassPrice, Double secondClassPrice, Double thirdClassPrice);
        void onError(String errorMessage);
    }

//    public void getTicketPrices(final OnTicketPricesReceivedListener listener) {
//        AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
//            @SuppressLint("StaticFieldLeak")
//            @Override
//            protected String doInBackground(Void... voids) {
//                try {
//                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/ticketprices/getallticketprices");
//                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//                    connection.setRequestMethod("GET");
//                    connection.setRequestProperty("Content-Type", "application/json");
//
//                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//                    StringBuilder stringBuilder = new StringBuilder();
//
//                    String line;
//                    while ((line = reader.readLine()) != null) {
//                        stringBuilder.append(line);
//                    }
//
//                    return stringBuilder.toString();
//                } catch (Exception e) {
//                    e.printStackTrace();
//                    return null;
//                }
//            }
//
//            @Override
//            protected void onPostExecute(String response) {
//                if (response != null) {
//                    try {
//                        Double firstClassPrice = parseTicketPriceJson(response, "FirstClassTicketPrice");
//                        Double secondClassPrice = parseTicketPriceJson(response, "SecondClassTicketPrice");
//                        Double thirdClassPrice = parseTicketPriceJson(response, "ThirdClassTicketPrice");
//
//                        listener.onTicketPricesReceived(firstClassPrice, secondClassPrice, thirdClassPrice);
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                        listener.onError("Error parsing JSON");
//                    }
//                } else {
//                    listener.onError("Error fetching data from API");
//                }
//            }
//        };
//
//        task.execute();
//    }

//    private Double parseTicketPriceJson(String json, String className) throws JSONException {
//        JSONObject jsonObject = new JSONObject(json);
//        return jsonObject.getDouble(className);
//    }

    public interface OnTrainNamesReceivedListener {
        void onTrainNamesReceived(List<String> trainNames);
        void onError(String errorMessage);
    }

    public void getTrains(final OnTrainNamesReceivedListener listener) {
        @SuppressLint("StaticFieldLeak") AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/trains/getalltrains");
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setRequestProperty("Content-Type", "application/json");

                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
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
                        List<String> trainNames = parseTrainNamesJson(response);
                        listener.onTrainNamesReceived(trainNames);
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

    private List<String> parseTrainNamesJson(String json) throws JSONException {
        List<String> trainNames = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(json);

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            String trainName = jsonObject.optString("TrainName");
            trainNames.add(trainName);
        }

        return trainNames;
    }


    public interface OnReservationDataReceivedListener {
        void onReservationDataReceived(List<TrainBooking> reservationList);
        void onError(String errorMessage);
    }

    public void getReservationsForUserFromAPI(String userId, final OnReservationDataReceivedListener listener) {
        @SuppressLint("StaticFieldLeak") AsyncTask<String, Void, String> task = new AsyncTask<String, Void, String>() {
            @Override
            protected String doInBackground(String... userId) {
                try {
                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/trainbooking/getallticketbookings" + "/" + userId[0]);
                    Log.d("ReservationApiClient", "API call made for userID: " + userId[0]);
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
                        List<TrainBooking> reservationList = parseJson(response);
                        Log.d("ReservationClient", "API Response: " + response);  // Log the API response
                        listener.onReservationDataReceived(reservationList);
                    } catch (JSONException e) {
                        e.printStackTrace();
                        listener.onError("Error parsing JSON");
                    }
                } else {
                    listener.onError("Error fetching data from API");
                }
            }
        };

        task.execute(userId);
    }

    public static void cancelReservationFromAPI(final TrainBooking reservation, final OnReservationCanceledListener listener) {
        AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/trainbooking/cancelticketbooking/" + reservation.getBookingID());
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("PUT");
                    connection.setRequestProperty("Content-Type", "application/json");

                    JSONObject requestBody = new JSONObject();
                    requestBody.put("MainPassengerName", reservation.getMainPassengerName());
                    requestBody.put("NIC", reservation.getNIC());
                    requestBody.put("TrainNumber", reservation.getTrainNumber());
                    requestBody.put("TrainName", reservation.getTrainName());
                    requestBody.put("DepartureStation", reservation.getDepartureStation());
                    requestBody.put("DestinationStation", reservation.getDestinationStation());
                    requestBody.put("TotalPassengers", reservation.getTotalPassengers());
                    requestBody.put("TotalPrice", reservation.getTotalPrice());
                    requestBody.put("TicketClass", reservation.getTicketClass());
                    requestBody.put("ContactNumber", reservation.getContactNumber());
                    requestBody.put("Email", reservation.getEmail());
                    requestBody.put("bookingDate", reservation.getBookingDate());
                    requestBody.put("ReservationDate", reservation.getReservationDate());

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
                    return null;
                }
            }

            @Override
            protected void onPostExecute(String response) {
                if (response != null && response.equals("Success")) {
                    listener.onReservationCanceled();
                } else {
                    listener.onError("Error canceling reservation");
                }
            }
        };

        task.execute();
    }

    public interface OnReservationCanceledListener {
        void onReservationCanceled();
        void onError(String errorMessage);
    }

    private List<TrainBooking> parseJson(String json) throws JSONException {
        List<TrainBooking> reservationList = new ArrayList<>();

        try {
            JSONArray jsonArray = new JSONArray(json);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);

                String ID = jsonObject.optString("BookingID");
                String mainPassengerName = jsonObject.optString("MainPassengerName");
                String nic = jsonObject.optString("NIC");
                String userID = jsonObject.optString("userID");
                Log.d("Updateuser","userid2: " + userID);
                String trainNumber = jsonObject.optString("TrainNumber");
                String trainName = jsonObject.optString("TrainName");
                String departureStation = jsonObject.optString("DepartureStation");
                String destinationStation = jsonObject.optString("DestinationStation");
                int totalPassengers = jsonObject.optInt("TotalPassengers");
                String ticketClass = jsonObject.optString("TicketClass");
                String totalPrice = jsonObject.optString("TotalPrice");
                String email = jsonObject.optString("Email");
                String phone = jsonObject.optString("ContactNumber");
                String reservationDate = jsonObject.optString("ReservationDate");
                String bookingDate = jsonObject.optString("BookingDate");
                Log.d("ReservationApiClient", "Parsed reservations: " + reservationList.size());

                TrainBooking reservation = new TrainBooking(ID, trainNumber, trainName, userID, bookingDate,
                        reservationDate, totalPassengers, mainPassengerName, phone, departureStation, destinationStation, email, nic, ticketClass, totalPrice);

                reservationList.add(reservation);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            Log.e("ReservationApiClient", "Error parsing JSON: " + e.getMessage());
        }

        return reservationList;
    }

    public static void updateReservationInAPI(final TrainBooking reservation, final OnReservationUpdatedListener listener) {
        AsyncTask<Void, Void, String> task = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    URL url = new URL("http://pasinduperera-001-site1.atempurl.com/api/trainbooking/updateticketbooking/" + reservation.getBookingID());
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("PUT");
                    connection.setRequestProperty("Content-Type", "application/json");

                    JSONObject requestBody = new JSONObject();
                    requestBody.put("MainPassengerName", reservation.getMainPassengerName());
                    requestBody.put("NIC", reservation.getNIC());
//                    requestBody.put("TrainNumber", reservation.getTrainNumber());
                    requestBody.put("TrainName", reservation.getTrainName());
                    requestBody.put("DepartureStation", reservation.getDepartureStation());
                    requestBody.put("DestinationStation", reservation.getDestinationStation());
                    requestBody.put("TotalPassengers", reservation.getTotalPassengers());
                    requestBody.put("TicketClass", reservation.getTicketClass());
//                    requestBody.put("TotalPrice", reservation.getTotalPrice());
                    requestBody.put("Email", reservation.getEmail());
                    requestBody.put("ContactNumber", reservation.getContactNumber());
                    requestBody.put("ReservationDate", reservation.getReservationDate());

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
                    return null;
                }
            }

            @Override
            protected void onPostExecute(String response) {
                if (response != null && response.equals("Success")) {
                    listener.onReservationUpdated();
                } else {
                    listener.onError("Error updating reservation");
                }
            }
        };

        task.execute();
    }

    public interface OnReservationUpdatedListener {
        void onReservationUpdated();
        void onError(String errorMessage);
    }
}