export const IsValidEmail = (email) => {
    // Checks if the provided string is a valid email address.
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
};

export const IsValidPassword = (password) => {
    // Checks if the provided string meets password requirements.
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
};

export const IsValidNIC = (nic) => {
    // Checks if the provided string is a valid National Identity Card (NIC) number. Assumes a 12-digit format.
    const nicPattern = /^\d{12}$/;
    return nicPattern.test(nic);
};

export const IsValidContactNumber = (contactNumber) => {
    // Checks if the provided string is a valid contact number. Assumes a 10-digit format.
    const contactNumberPattern = /^\d{10}$/;
    return contactNumberPattern.test(contactNumber);
};

export const IsValidTicketClass = (ticketClass) => {
    // Checks if the provided string is a valid ticket class. It validates against an array of valid classes: "First Class", "Second Class", and "Third Class".
    return ["First Class", "Second Class", "Third Class"].includes(ticketClass);
};

export const IsValidTimeRange = (departureTime, arrivalTime) => {
    // Checks if the departure time is earlier than the arrival time. Assumes time format in HH:mm.
    const departureTimeArray = departureTime.split(':').map(Number);
    const arrivalTimeArray = arrivalTime.split(':').map(Number);

    return (
        departureTimeArray[0] < arrivalTimeArray[0] ||
        (departureTimeArray[0] === arrivalTimeArray[0] && departureTimeArray[1] < arrivalTimeArray[1])
    );
};

export const IsValidTrainNumber = (trainNumber) => {
    // Checks if the provided string is a valid train number. Assumes a format where it starts with a capital letter followed by four digits.
    const trainIDPattern = /^[A-Z]\d{4}$/;
    return trainIDPattern.test(trainNumber);
};