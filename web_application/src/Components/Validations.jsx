export const IsValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
};

export const IsValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
};

export const IsValidNIC = (nic) => {
    const nicPattern = /^\d{12}$/;
    return nicPattern.test(nic);
};

export const IsValidContactNumber = (contactNumber) => {
    const contactNumberPattern = /^\d{10}$/;
    return contactNumberPattern.test(contactNumber);
};

export const IsValidTicketClass = (ticketClass) => {
    return ["First Class", "Second Class", "Third Class"].includes(ticketClass);
};

export const IsValidTimeRange = (departureTime, arrivalTime) => {
    const departureTimeArray = departureTime.split(':').map(Number);
    const arrivalTimeArray = arrivalTime.split(':').map(Number);

    return (
        departureTimeArray[0] < arrivalTimeArray[0] ||
        (departureTimeArray[0] === arrivalTimeArray[0] && departureTimeArray[1] < arrivalTimeArray[1])
    );
};

export const IsValidTrainNumber = (trainNumber) => {
    const trainIDPattern = /^[A-Z]\d{4}$/;
    return trainIDPattern.test(trainNumber);
};