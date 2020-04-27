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



router.post('/images/upload', upload.array('images'), img_ctrl.Create)
router.route('/images')
    .get(img_ctrl.findAll)
    .delete(img_ctrl.Remove)
router.route('/images/:id')
    .get(img_ctrl.GetById)
    .post(upload.single('image'), img_ctrl.Update)
    .delete(img_ctrl.RemoveById)
router.get('/images/getImage/:roomType', img_ctrl.GetByRoomType)
module.exports = router;
