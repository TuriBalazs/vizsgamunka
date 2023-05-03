const express=require('express');
const router=express.Router();
const {markaFelvesz,getMarkak,getMarka}=require('../controllers/markakController');

router.post('/felvesz',markaFelvesz);
router.get('/marka/:nev',getMarka);
router.get('/',getMarkak);


module.exports=router;