const multer = require('multer');
const express = require('express')
const img_ctrl = require('../controllers/images.controller')
const path = require('path')
const router = express.Router();


const upload = multer({
    dest: 'public/uploads/',
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});



router.post('/upload', upload.array('images'), img_ctrl.Create)
router.get('/images', img_ctrl.findAll)
module.exports = router;
