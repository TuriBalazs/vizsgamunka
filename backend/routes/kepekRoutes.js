const express=require('express');
const router=express.Router();
const {getImages, getImagesByTermek}=require('../controllers/kepekController');

router.get('/:id',getImages);
router.get('/termek/:id',getImagesByTermek);

module.exports=router;