const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const register = asyncHandler(async (req, res) => {
    const { vnev, knev, email, password, phone } = req.body;
    const e_mail = await User.findOne({ email: email });
    if (e_mail) {
        res.status(400);
        throw new Error("Ezzel az e-mail-el már regisztráltak!");
    }
    if (!vnev || !knev || !email || !password) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ujUser = await User.create({
        vnev: vnev,
        knev: knev,
        email: email,
        password: hashedPassword,
        phone: phone
    });
    console.log(ujUser.id);
    const token = generateToken(ujUser.id);
    res.json(token);

});
const registerAdmin = asyncHandler(async (req, res) => {
    const { vnev, knev, email, password, phone } = req.body;
    const e_mail = await User.findOne({ email: email });
    if (e_mail) {
        res.status(400);
        throw new Error("Ezzel az e-mail-el már regisztráltak!");
    }
    if (!vnev || !knev || !email || !password) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ujUser = await User.create({
        vnev: vnev,
        knev: knev,
        email: email,
        password: hashedPassword,
        phone: phone,
        admin: "igen"
    });
    console.log(ujUser.id);
    const token = generateToken(ujUser.id);
    res.json(token);

});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    

    const user = await User.findOne({ email: email });
    if(!user){
        res.status(400).send("Nincs ilyen felhasználó!");
    }
    if(!await bcrypt.compare(password, user.password)){
        res.status(400).send("Hibás jelszó!");
    }

    const token = generateToken(user.id);

    res.status(200).json(token);

});

const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    res.json(user);
});

const modifyUser = asyncHandler(async (req, res) => {
    const user = req.user;
    let email = req.body.email;
    let phone = req.body.phone;

    await User.updateOne({_id:user._id},{$set:{
        email: email,
        phone: phone
    }})
    res.json({ message: "Felhasználó adatmódosítás" });
})

module.exports = { register, login, getUser, modifyUser, registerAdmin }
