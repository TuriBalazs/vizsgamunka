const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Rendeles = require('../models/Rendeles');

const RendelesLead = asyncHandler(async (req, res) => {
    const path = appDir + "/files/rendelesek";
    const { fizetesi_mod, vnev, knev, phone, szallitasi_cim, szamlazasi_cim, kedvezmeny, vegosszeg, szcmId, userId } = req.body;

    if (fizetesi_mod || szallitasi_cim || szamlazasi_cim || kedvezmeny || vegosszeg || tetelek) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }

    const ujRendeles = await Rendeles.create({
        fizetesi_mod: fizetesi_mod,
        vnev: vnev,
        knev: knev,
        phone: phone,
        szallitasi_cim: szallitasi_cim,
        szamlazasi_cim: szamlazasi_cim,
        kedvezmeny: kedvezmeny,
        vegosszeg: vegosszeg,
        tetelek: req.files.filename,
        szcmId: szcmId,
        userId: userId
    });

    if (!fs.existsSync(path + ujRendeles.id)) {
        fs.mkdir(path + ujRendeles.id, err => (console.log(err)));
    }

    for (prop in req.files) {
        fs.writeFile(path + ujRendeles.id + req.files[prop].name, req.files[prop].data, err => { console.log(err) });
    }

    console.log(ujRendeles.id);
    res.json({ message: "Sikeres rendelés" })
});

module.exports = { RendelesLead }