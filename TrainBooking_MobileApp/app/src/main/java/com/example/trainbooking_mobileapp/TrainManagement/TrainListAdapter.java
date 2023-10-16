package com.example.trainbooking_mobileapp.TrainManagement;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.trainbooking_mobileapp.R;
import java.util.List;

public class TrainListAdapter extends RecyclerView.Adapter<TrainListAdapter.ViewHolder> {

    // List of trains to display
    private List<Train> trainList;

    // Inflater for inflating the layout
    private LayoutInflater inflater;

    // Constructor to initialize the adapter
    public TrainListAdapter(Context context, List<Train> trainList) {
        this.inflater = LayoutInflater.from(context);
        this.trainList = trainList;
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = inflater.inflate(R.layout.train_list_item, parent, false);
        return new ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Train train = trainList.get(position);

        // Set train details to the respective TextViews

        // Train Name
        holder.trainNameTextView.setText(train.getTrainName());

        // Departure Time
        if (train.getDepartureTime() != null) {
            holder.departureTimeTextView.setText(train.getDepartureTime());
        } else {
            holder.departureTimeTextView.setText("N/A");
        }

        // Arrival Time
        if (train.getArrivalTime() != null) {
            holder.arrivalTimeTextView.setText(train.getArrivalTime());
        } else {
            holder.arrivalTimeTextView.setText("N/A");
        }

        // Departure Station
        holder.departureStationTextView.setText(train.getDepartureStation());

        // Arrival Station
        holder.arrivalStationTextView.setText(train.getArrivalStation());

        // First Class Ticket Price
        holder.firstClassTicketPriceTextView.setText(train.getFirstClassTicketPrice());

        // Second Class Ticket Price
        holder.secondClassTicketPriceTextView.setText(train.getSecondClassTicketPrice());

        // Third Class Ticket Price
        holder.thirdClassTicketPriceTextView.setText(train.getThirdClassTicketPrice());

        // Train Status
        holder.statusTextView.setText(train.getStatus());
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return trainList.size();
    }

    // Provide a reference to the views for each data item
    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView trainNameTextView, departureTimeTextView, arrivalTimeTextView, departureStationTextView, arrivalStationTextView, firstClassTicketPriceTextView, secondClassTicketPriceTextView, thirdClassTicketPriceTextView, statusTextView;

        // Constructor to initialize the views
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            // Initialize TextViews

            trainNameTextView = itemView.findViewById(R.id.trainNameTextView);
            departureTimeTextView = itemView.findViewById(R.id.departureTimeTextView);
            arrivalTimeTextView = itemView.findViewById(R.id.arrivalTimeTextView);
            departureStationTextView = itemView.findViewById(R.id.departureStationTextView);
            arrivalStationTextView = itemView.findViewById(R.id.arrivalStationTextView);
            firstClassTicketPriceTextView = itemView.findViewById(R.id.firstClassTicketPriceTextView);
            secondClassTicketPriceTextView = itemView.findViewById(R.id.secondClassTicketPriceTextView);
            thirdClassTicketPriceTextView = itemView.findViewById(R.id.thirdClassTicketPriceTextView);
            statusTextView = itemView.findViewById(R.id.statusTextView);
        }
    }
}