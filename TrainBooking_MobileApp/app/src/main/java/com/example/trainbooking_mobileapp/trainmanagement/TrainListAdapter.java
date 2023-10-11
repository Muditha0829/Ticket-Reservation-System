package com.example.trainbooking_mobileapp.TrainManagement;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.trainbooking_mobileapp.R;

import java.util.List;

public class TrainListAdapter extends RecyclerView.Adapter<TrainListAdapter.ViewHolder> {

    private List<Train> trainList;
    private LayoutInflater inflater;

    public TrainListAdapter(Context context, List<Train> trainList) {
        this.inflater = LayoutInflater.from(context);
        this.trainList = trainList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = inflater.inflate(R.layout.train_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Train train = trainList.get(position);
        holder.TrainIDTextView.setText(train.getTrainID());
        Log.d("TrainListAdapter", "Train ID set: " + train.getTrainID());

        holder.trainNameTextView.setText(train.getTrainName());
        Log.d("TrainListAdapter", "Train Name set: " + train.getTrainName());

        if (train.getDepartureTime() != null) {
            holder.departureTimeTextView.setText(train.getDepartureTime());
            Log.d("TrainListAdapter", "Departure Time set: " + train.getDepartureTime());
        } else {
            holder.departureTimeTextView.setText("N/A");
            Log.d("TrainListAdapter", "Departure Time set to N/A");
        }

        if (train.getArrivalTime() != null) {
            holder.arrivalTimeTextView.setText(train.getArrivalTime());
            Log.d("TrainListAdapter", "Arrival Time set: " + train.getArrivalTime());
        } else {
            holder.arrivalTimeTextView.setText("N/A");
            Log.d("TrainListAdapter", "Arrival Time set to N/A");
        }

        holder.departureStationTextView.setText(train.getDepartureStation());
        Log.d("TrainListAdapter", "Train Name set: " + train.getDepartureStation());

        holder.arrivalStationTextView.setText(train.getArrivalStation());
        Log.d("TrainListAdapter", "Train Name set: " + train.getArrivalStation());

        holder.firstClassTicketPriceTextView.setText(train.getFirstClassTicketPrice());
        holder.secondClassTicketPriceTextView.setText(train.getSecondClassTicketPrice());
        holder.thirdClassTicketPriceTextView.setText(train.getThirdClassTicketPrice());

        holder.statusTextView.setText(train.getStatus());
        Log.d("TrainListAdapter", "Train Status: " + train.getStatus());
    }

    @Override
    public int getItemCount() {
        return trainList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView TrainIDTextView, trainNameTextView, departureTimeTextView, arrivalTimeTextView, departureStationTextView, arrivalStationTextView, firstClassTicketPriceTextView, secondClassTicketPriceTextView, thirdClassTicketPriceTextView, statusTextView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            TrainIDTextView = itemView.findViewById(R.id.TrainIDTextView);
            trainNameTextView = itemView.findViewById(R.id.trainNameTextView);
            departureTimeTextView = itemView.findViewById(R.id.departureTimeTextView);
            arrivalTimeTextView = itemView.findViewById(R.id.arrivalTimeTextView);
            departureStationTextView = itemView.findViewById(R.id.departureStationTextView);
            arrivalStationTextView = itemView.findViewById(R.id.arrivalStationTextView);
            firstClassTicketPriceTextView = itemView.findViewById(R.id.firstClassTicketPriceTextView);
            secondClassTicketPriceTextView = itemView.findViewById(R.id.secondClassTicketPriceTextView);
            thirdClassTicketPriceTextView = itemView.findViewById(R.id.thirdClassTicketPriceTextView);
            statusTextView = itemView.findViewById(R.id.statusTextView);

            TrainIDTextView = itemView.findViewById(R.id.TrainIDTextView);
            Log.d("TrainListAdapter", "TrainIDTextView initialized: " + (TrainIDTextView != null));

            trainNameTextView = itemView.findViewById(R.id.trainNameTextView);
            Log.d("TrainListAdapter", "trainNameTextView initialized: " + (trainNameTextView != null));

            departureTimeTextView = itemView.findViewById(R.id.departureTimeTextView);
            Log.d("TrainListAdapter", "departureTimeTextView initialized: " + (departureTimeTextView != null));

            arrivalTimeTextView = itemView.findViewById(R.id.arrivalTimeTextView);
            Log.d("TrainListAdapter", "arrivalTimeTextView initialized: " + (arrivalTimeTextView != null));

            departureStationTextView = itemView.findViewById(R.id.departureStationTextView);
            Log.d("TrainListAdapter", "departureTimeTextView initialized: " + (departureStationTextView != null));

            arrivalStationTextView = itemView.findViewById(R.id.arrivalStationTextView);
            Log.d("TrainListAdapter", "arrivalTimeTextView initialized: " + (arrivalStationTextView != null));

            firstClassTicketPriceTextView = itemView.findViewById(R.id.firstClassTicketPriceTextView);
            secondClassTicketPriceTextView = itemView.findViewById(R.id.secondClassTicketPriceTextView);
            thirdClassTicketPriceTextView = itemView.findViewById(R.id.thirdClassTicketPriceTextView);

            statusTextView = itemView.findViewById(R.id.statusTextView);
            Log.d("TrainListAdapter", "statusTextView initialized: " + (statusTextView != null));

        }
    }
}