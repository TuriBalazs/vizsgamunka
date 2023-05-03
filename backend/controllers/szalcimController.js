const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const SzalCim = require('../models/SzalCim');



const szalcimFelvesz = asyncHandler(async (req, res) => {
    const { iranyitoszam, varosnev, cim } = req.body;
    const user = req.user
    
    if (!iranyitoszam || !varosnev || !cim) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }


    const ujSzalcim = await SzalCim.create({
        iranyitoszam: iranyitoszam,
        varosnev: varosnev,
        cim: cim,
        userId:user.id
    });

    console.log(ujSzalcim.id);
    res.json({ message: "Sikeres felvétel" })
});

const szalPontok = asyncHandler(async (req, res) => {
    const { iranyitoszam, varosnev, cim } = req.body;
    const temp = await SzalCim.findOne({ cim: cim });
    if (temp) {
        res.status(400);
        throw new Error("Ez a cím már használt!");
    }
    if (!iranyitoszam || !varosnev || !cim) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }


    const ujSzalcim = await SzalCim.create({
        iranyitoszam: iranyitoszam,
        varosnev: varosnev,
        cim: cim
    });

    console.log(ujSzalcim.id);
    res.json({ message: "Sikeres felvétel" })
});


const getSzalCimek = asyncHandler(async (req, res) => {
    const szalcimek = await SzalCim.find({});
    res.json(szalcimek);
});



module.exports = { szalcimFelvesz, getSzalCimek, szalPontok }