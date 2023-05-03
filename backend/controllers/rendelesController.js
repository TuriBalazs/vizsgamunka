const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Rendeles = require('../models/Rendeles');

const RendelesLead = asyncHandler(async (req, res) => {
    const { fizetesi_mod, vnev, knev, phone, szallitasi_cim, szamlazasi_cim, kedvezmeny, vegosszeg, tetelek, szcmId } = req.body;
    
    if (fizetesi_mod || szallitasi_cim || szamlazasi_cim || kedvezmeny || vegosszeg || tetelek || tetelek) {
        res.status(400);
        throw new Error("Már készleten van!");
    }

    const ujRendeles = await Rendeles.create({
        fizetesi_mod: fizetesi_mod,
        szallitasi_cim: szallitasi_cim,
        szamlazasi_cim: szamlazasi_cim,
        kedvezmeny: kedvezmeny,
        vegosszeg: vegosszeg,
        tetelek: tetelek,
        szcmId:szcmId
    });

    console.log(ujRendeles.id);
    res.json({ message: "Sikeres felvétel" })
});

module.exports = { RendelesLead }