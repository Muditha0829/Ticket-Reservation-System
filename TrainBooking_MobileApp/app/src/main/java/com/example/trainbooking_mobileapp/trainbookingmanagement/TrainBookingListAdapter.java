package com.example.trainbooking_mobileapp.trainbookingmanagement;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
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

public class TrainBookingListAdapter extends RecyclerView.Adapter<TrainBookingListAdapter.ViewHolder> {

    private List<TrainBooking> reservationList;
    private LayoutInflater inflater;
    private Context context;
    private String userID;

    public TrainBookingListAdapter(Context context, List<TrainBooking> reservationList) {
        this.inflater = LayoutInflater.from(context);
        this.reservationList = reservationList;
        this.context = context;
        this.userID = userID;
    }

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
        TrainBooking reservation = reservationList.get(position);

        Log.d("ReservationListAdapter", "Reservation ID: " + reservation.getBookingID());

        holder.reservationTrainNameTextView.setText(reservation.getTrainName());
        holder.reservationBookingStatusTextView.setText(reservation.getMainPassengerName());
        holder.reservationReservationDateTextView.setText(reservation.getReservationDate());
        holder.reservationBookingDateTextView.setText(reservation.getBookingDate());

        Button updateButton = holder.itemView.findViewById(R.id.updateButton);
        Button viewButton = holder.itemView.findViewById(R.id.viewButton);
        Button cancelButton = holder.itemView.findViewById(R.id.cancelButton);

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openUpdateReservationActivity(reservation);
            }
        });

        viewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openViewReservationActivity(reservation);
            }
        });

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

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            reservationTrainNameTextView = itemView.findViewById(R.id.reservationTrainNameTextView);
            reservationBookingStatusTextView = itemView.findViewById(R.id.reservationBookingStatusTextView);
            reservationReservationDateTextView = itemView.findViewById(R.id.reservationReservationDateTextView);
            reservationBookingDateTextView = itemView.findViewById(R.id.reservationBookingDateTextView);
        }
    }

    private void cancelReservation(TrainBooking reservation) {
        TrainBookingApiClient.cancelReservationFromAPI(reservation, new TrainBookingApiClient.OnReservationCanceledListener() {
            @Override
            public void onReservationCanceled() {
                reservationList.remove(reservation);
                notifyDataSetChanged();
                Toast.makeText(context, "Reservation canceled successfully", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(String errorMessage) {
                Toast.makeText(context, "You can only cancel reservations at least 5 days before the reservation date.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void openUpdateReservationActivity(TrainBooking reservation) {
        Intent intent = new Intent(context, UpdateTrainBookingActivity.class);
        intent.putExtra("reservation", reservation);
        intent.putExtra("userID", userID);
        ((Activity) context).startActivityForResult(intent, 1001);
    }

    private void openViewReservationActivity(TrainBooking reservation) {
        Intent intent = new Intent(context, TrainBookingViewActivity.class);
        intent.putExtra("reservation", reservation);
        intent.putExtra("userID", userID);
        ((Activity) context).startActivityForResult(intent, 1001);
    }
}