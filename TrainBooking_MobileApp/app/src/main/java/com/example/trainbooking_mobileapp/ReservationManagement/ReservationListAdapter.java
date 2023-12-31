package com.example.trainbooking_mobileapp.ReservationManagement;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.trainbooking_mobileapp.R;
import java.util.List;

public class ReservationListAdapter extends RecyclerView.Adapter<ReservationListAdapter.ViewHolder> {

    private List<Reservation> reservationList;
    private LayoutInflater inflater;
    private Context context;
    private String userID;

    // Constructor
    public ReservationListAdapter(Context context, List<Reservation> reservationList) {
        this.inflater = LayoutInflater.from(context);
        this.reservationList = reservationList;
        this.context = context;
        this.userID = userID;
    }

    // Set user ID
    public void setUserID(String userID) {
        this.userID = userID;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = inflater.inflate(R.layout.reservation_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Reservation reservation = reservationList.get(position);

        // Bind reservation data to views
        holder.reservationTrainNameTextView.setText(reservation.getTrainName());
        holder.reservationBookingStatusTextView.setText(reservation.getMainPassengerName());
        holder.reservationReservationDateTextView.setText(reservation.getReservationDate());
        holder.reservationBookingDateTextView.setText(reservation.getBookingDate());

        // Set click listeners for buttons
        Button updateButton = holder.itemView.findViewById(R.id.updateButton);
        Button viewButton = holder.itemView.findViewById(R.id.viewButton);
        Button cancelButton = holder.itemView.findViewById(R.id.cancelButton);

        // Update Button Click Listener
        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openUpdateReservationActivity(reservation);
            }
        });

        // View Button Click Listener
        viewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openViewReservationActivity(reservation);
            }
        });

        // Cancel Button Click Listener
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cancelReservation(reservation);
            }
        });
    }

    @Override
    public int getItemCount() {
        return reservationList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView reservationTrainNameTextView, reservationBookingStatusTextView, reservationReservationDateTextView, reservationBookingDateTextView;

        // ViewHolder constructor
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            reservationTrainNameTextView = itemView.findViewById(R.id.reservationTrainNameTextView);
            reservationBookingStatusTextView = itemView.findViewById(R.id.reservationBookingStatusTextView);
            reservationReservationDateTextView = itemView.findViewById(R.id.reservationReservationDateTextView);
            reservationBookingDateTextView = itemView.findViewById(R.id.reservationBookingDateTextView);
        }
    }

    // Cancel Reservation
    private void cancelReservation(Reservation reservation) {
        ReservationApiClient.cancelReservationFromAPI(reservation, new ReservationApiClient.OnReservationCanceledListener() {
            @Override
            public void onReservationCanceled() {
                reservationList.remove(reservation);
                notifyDataSetChanged();
                Toast.makeText(context, "Reservation canceled successfully", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(String errorMessage) {
                Toast.makeText(context, "You can only cancel reservations at least 5 days before the your ticket booking date.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    // Open Update Reservation Activity
    private void openUpdateReservationActivity(Reservation reservation) {
        Intent intent = new Intent(context, UpdateReservationActivity.class);
        intent.putExtra("reservation", reservation);
        intent.putExtra("userID", userID);
        ((Activity) context).startActivityForResult(intent, 1001);
    }

    // Open View Reservation Activity
    private void openViewReservationActivity(Reservation reservation) {
        Intent intent = new Intent(context, ReservationViewActivity.class);
        intent.putExtra("reservation", reservation);
        intent.putExtra("userID", userID);
        ((Activity) context).startActivityForResult(intent, 1001);
    }
}