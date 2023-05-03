const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Markak = require('../models/Markak');



const markaFelvesz = asyncHandler(async (req, res) => {
    const { nev } = req.body;
    const _nev = await Markak.findOne({ nev: nev });
    if (_nev) {
        res.status(400);
        throw new Error("Ez a márka már létezik!");
    }
    if (!nev) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }


    const ujMarka = await Markak.create({
        nev: nev
    });

    console.log(ujMarka.id);
    res.json({ message: "Sikeres felvétel" })
});




const getMarkak = asyncHandler(async (req, res) => {
    const markak = await Markak.find({});
    res.json(markak);
});

const getMarka = asyncHandler(async (req, res) => {
    const { nev } = req.params;
    const marka = await Markak.find({ nev: nev });
    res.json(marka);
});



module.exports = { markaFelvesz, getMarkak, getMarka }