package com.example.trainbooking_mobileapp.UserManagement;

import java.io.Serializable;

public class User implements Serializable {

    // Member variables
    private String ID;
    private String NIC;
    private String FirstName;
    private String LastName;
    private String UserName;
    private String Email;
    private String Gender;
    private String ContactNumber;
    private String UserType;
    private String Password;
    private String RePassword;
    private String UserStatus;

    // Constructor to initialize user data
    public User(String ID, String FirstName, String LastName, String UserName, String Email, String NIC, String Gender, String ContactNumber, String userType, String Password, String RePassword, String userStatus) {
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserName = UserName;
        this.Email = Email;
        this.NIC = NIC;
        this.Gender = Gender;
        this.Password = Password;
        this.RePassword = RePassword;
        this.ContactNumber = ContactNumber;
        this.UserType = "Traveller";
        this.UserStatus = "Active";
    }

    // Getter and setter methods for user properties

    public String getID() {
        return ID;
    }

    public void setID(String UserID) {
        this.ID = UserID;
    }

    public String getNIC() {
        return NIC;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String Gender) {
        this.Gender = Gender;
    }

    public String getContactNumber() {
        return ContactNumber;
    }

    public void setContactNumber(String ContactNumber) {
        this.ContactNumber = ContactNumber;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        this.FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        this.LastName = lastName;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String username) {
        this.UserName = username;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        this.Password = password;
    }

    public String getRePassword() {
        return RePassword;
    }

    public void setRePassword(String reenteredPassword) {
        this.RePassword = reenteredPassword;
    }

    public String getUserType() {
        return UserType;
    }

    public void setUserType(String userType) {
        this.UserType = userType;
    }

    public String getUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(String userStatus) {
        this.UserStatus = userStatus;
    }
}