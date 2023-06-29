const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground,storeReturnTo } = require('../middleware');
const multer= require('multer')
const upload=multer({dest:'uploads/'})
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,storeReturnTo,validateCampground, catchAsync(campgrounds.createCampground))
    // .post(,(req,res)=>{
    //     console.log(req.body,req.files)
    //     res.send('it worked')
    // })

router.get('/new', isLoggedIn,storeReturnTo, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, storeReturnTo,isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, storeReturnTo,isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, storeReturnTo,isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;