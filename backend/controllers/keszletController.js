const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Termekek = require('../models/Termekek');
const Keszlet = require('../models/Keszlet');



const keszletFelvesz = asyncHandler(async (req, res) => {
    const { sorozatszam, nev } = req.body;
    const sorszam = Keszlet.findOne({sorozatszam:sorozatszam})
    const termek = await Termekek.findOne({ nev: nev });
    if (sorszam) {
        res.status(400);
        throw new Error("Már készleten van!");
    }
    if (!nev || !szorozatszam) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }


    const ujKeszlet = await Markak.create({
        szorozatszam: sorozatszam,
        trkId: termek.id
    });

    console.log(ujKeszlet.id);
    res.json({ message: "Sikeres felvétel" })
});




const deleteKeszlet = asyncHandler(async (req, res) => {
    const id = req.body.sorozatszam
    await Keszlet.deleteOne({sorozatszam: id})
    res.status(200)
});

const getKeszlet = asyncHandler(async (req, res) => {
    const keszlet = await Keszlet.find({});
    res.json(keszlet);
});



module.exports = { keszletFelvesz, deleteKeszlet, getKeszlet }