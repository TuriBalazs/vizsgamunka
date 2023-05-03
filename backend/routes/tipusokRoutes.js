const express=require('express');
const router=express.Router();
const {tipusFelvesz,getTipus,getTipusok}=require('../controllers/tipusokController');

router.post('/felvesz',tipusFelvesz);
router.get('/tipus/:nev',getTipus);
router.get('/',getTipusok);


module.exports=router;