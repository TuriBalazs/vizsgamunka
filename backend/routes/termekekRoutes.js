const express=require('express');
const router=express.Router();
const {termekFelvesz, getTermekek, getTermekByMarka, getTermekByTipus, termekModosit}=require('../controllers/termekekController');

router.post('/felvesz',termekFelvesz);
router.get('/',getTermekek);
router.get('/bymarka/:nev',getTermekByMarka);
router.get('/bytipus/:nev',getTermekByTipus);
router.post('/modosit',termekModosit);

module.exports=router;