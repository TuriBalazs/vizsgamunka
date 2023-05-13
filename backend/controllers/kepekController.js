const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Kepek = require('../models/Kepek');
const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const getImages = asyncHandler(async (req, res) => {

    const images = await Kepek.findOne({ trkId: req.params.id });

    if (!images) {
        throw new Error("Nincsenek feltöltött képek!")
    }

    res.json({ path: "/files/" + images.trkId + "/mini/", images: images.belyeg });

});

const getImagesByTermek = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const images = await Kepek.find({ trkId: req.params.id });
    console.log(images)
    if (!images) {
        throw new Error("Nincsenek feltöltött képek!")
    }

    res.json({ path: "/files/" + req.params.id + "/", images: images });

});


module.exports = { getImages, getImagesByTermek };