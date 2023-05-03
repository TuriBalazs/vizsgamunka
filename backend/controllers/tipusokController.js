const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Tipusok = require('../models/Tipusok');



const tipusFelvesz = asyncHandler(async (req, res) => {
    const { nev } = req.body;
    const _nev = await Tipusok.findOne({ nev: nev });
    if (_nev) {
        res.status(400);
        throw new Error("Ez a márka már létezik!");
    }
    if (!nev) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }


    const ujTipus = await Tipusok.create({
        nev: nev
    });

    console.log(ujTipus.id);
    res.json({ message: "Sikeres felvétel" })
});




const getTipusok = asyncHandler(async (req, res) => {
    const markak = await Tipusok.find({});
    res.json(markak);
});

const getTipus = asyncHandler(async (req, res) => {
    const { nev } = req.params;
    const marka = await Tipusok.find({ nev: nev });
    res.json(marka);
});



module.exports = { tipusFelvesz, getTipusok, getTipus }