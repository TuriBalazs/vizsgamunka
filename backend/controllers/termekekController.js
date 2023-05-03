const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Markak = require('../models/Markak');
const Tipusok = require('../models/Tipusok');
const Termekek = require('../models/Termekek');
const Artortenet = require('../models/Artortenet');
const Kepek = require('../models/Kepek')
const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const termekFelvesz = asyncHandler(async (req, res) => {
    const { nev, leiras, garancia, ar, akcio, marka, tipus } = req.body;
    const path = appDir + "/files/";
    const _nev = await Termekek.findOne({ nev: nev });
    const markaid = await Markak.findOne({ nev: marka });
    const tipusid = await Tipusok.findOne({ nev: tipus });

    let altakcio = akcio
    let specname = "";
    let mininame = [];
    let largename = [];

    for (prop in req.files) {
        if (prop.includes("specs")) {
            specname = req.files[prop].name
        }
    }

    if (_nev) {
        res.status(400);
        throw new Error("Ez a termék már létezik!");
    }
    if (!nev || !leiras || !garancia || !ar || !marka || !tipus) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }
    if (akcio === "") {
        altakcio = null;
    }

    const ujTermek = await Termekek.create({
        nev: nev,
        leiras: leiras,
        specifikaciok: specname,
        garancia: garancia,
        ar: ar,
        akcio: altakcio,
        mraId: markaid.id,
        tisId: tipusid.id
    });
    
    const kep = Kepek.findOne({ trkId: ujTermek.id })
    const volt = Artortenet.findOne({ trkId: ujTermek.id })

    if (!fs.existsSync(path + ujTermek.id)) {
        fs.mkdir(path + ujTermek.id, err => (console.log(err)));
        fs.mkdir(path + ujTermek.id + '/specifikaciok', err => (console.log(err)));
        fs.mkdir(path + ujTermek.id + '/mini', err => (console.log(err)));
        fs.mkdir(path + ujTermek.id + '/large', err => (console.log(err)));
    }

    if (!kep.trkId) {
        for (prop in req.files) {
            if (prop.includes("specs")) {
                fs.writeFile(path + ujTermek.id + '/specifikaciok/' + req.files[prop].name, req.files[prop].data, err => { console.log(err) });
            }
            if (prop.includes("mini")) {
                mininame.push(req.files[prop].name)
                fs.writeFile(path + ujTermek.id + '/mini/' + req.files[prop].name, req.files[prop].data, err => { console.log(err) });
            }
            if (prop.includes("large")) {
                largename.push(req.files[prop].name)
                fs.writeFile(path + ujTermek.id + '/large/' + req.files[prop].name, req.files[prop].data, err => { console.log(err) });
            }
        }

        for (let i = 0; i < mininame.length; i++) {
            await Kepek.create({
                eredeti: largename[i],
                belyeg: mininame[i],
                trkId: ujTermek.id
            });
        }
    }

    if (!volt._id) {
        await Artortenet.create({
            ar: ujTermek.ar,
            trkId: ujTermek.id
        });
    }


    res.json({ message: "Sikeres felvétel" })
});



const getTermekek = asyncHandler(async (req, res) => {
    const termekek = await Termekek.find({});
    res.json(termekek);
});

const getTermekByMarka = asyncHandler(async (req, res) => {
    const { nev } = req.params;
    const marka = await Markak.findOne({ nev: nev });
    const termek = await Termekek.find({ mraId: marka.id })
    res.json(termek);
});

const getTermekByTipus = asyncHandler(async (req, res) => {
    const { nev } = req.params;
    const tipus = await Tipusok.findOne({ nev: nev });
    const termek = await Termekek.find({ tisId: tipus.id })
    res.json(termek);
});

const termekModosit = asyncHandler(async (req, res) => {
    const { _id, nev, leiras, garancia, ar, akcio} = req.body
    const letezik = Termekek.find({ _id: _id })
    const regiAr = letezik.ar

    let altakcio = akcio
    if (akcio === "") {
        altakcio = null;
    }

    const modositott = await Termekek.updateOne({ _id: _id},{
        $set: {
            nev: nev,
            leiras: leiras,
            garancia: garancia,
            ar: ar,
            akcio: altakcio
        }
    })
    if (modositott.ar != regiAr) {
        await Artortenet.updateOne({ trkId: _id }, {
            $set: {
                vegDatum: Date()
            }
        })
        await Artortenet.create({
            ar: modositott.ar,
            trkId: _id
        });
    }


})


module.exports = { termekFelvesz, getTermekByMarka, getTermekek, getTermekByTipus, termekModosit }