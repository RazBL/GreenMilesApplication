const DB = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


class UsersModel {
    _id;
    firstName;
    lastName;
    email;
    phoneNumber;
    password;
    image;
    country;
    city;
    address;
    savedFlights;
    savedHotels


    constructor(_id, firstName, lastName, email, phoneNumber, password, image, country, city, address, savedHotels, savedFlights) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.country = country;
        this.city = city;
        this.address = address;
        this.image = image;
        this.savedFlights = savedFlights;
        this.savedHotels = savedHotels;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllUsers() {
        return await new DB().FindAll('users');
    }

    static async DeleteUser(userId) {
        await new DB().DeleteDocument('users', userId);
    }

    static async Register(user) {
            let hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            return await new DB().InsertDocument(user, 'users');
    }

    static async Login(email, password) {
        let query = {
            email: email
        }
        let user = await new DB().FindOne(query, 'users');
        if(!user || !(await bcrypt.compare(password, user.password)))
            return null;
        return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
    }

    static async UpdateUser(userId, user) {
        await new DB().UpdateDocumentById(userId, user, 'users');
    }

    static async GenerateUserToken(user) {
        return await new DB().GenerateToken(user);
    }

    static async GetUserProfile(userId){
        return await new DB().GetProfile(userId);
    }
}

module.exports = UsersModel;