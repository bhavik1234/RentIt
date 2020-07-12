
const express = require('express');
var multer = require('multer');
var path = require('path');
var ElectronicSchema = require('../models/electronics');
const helpers = require('./helper');

var router = express.Router();
var filename;
var filelength

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, callback) {
        // console.log("req is",req)
        // console.log("files are", file)
        var ext = path.extname(file.originalname);
        var file = file.originalname
        file = file.substr(0, file.lastIndexOf("."))
        var filename = `${file}-${new Date().getTime()}${ext}`;
        console.log("filemame is", filename)
        callback(null, filename);
    }
});
var upload = multer({ storage: storage })

//Uploading multiple files
router.post('/image', upload.array('myFiles', 12), (req, res, next) => {
    console.log("body is", req.body);
    const files = req.files;
    console.log("files is", files)
    this.filename = `http://${req.get('host')}/uploads/${req.files[0].filename}`;
    this.filelength = req.files.length;
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    } else {
        console.log("hllooo")
        res.status(200).json({ msg: "Success" })
    }
})

router.post('/', (req, res) => {
    console.log("Resulti is", req.body)
    var electronic = new ElectronicSchema(req.body);
    if (this.filelength > 0) {
        electronic.image = this.filename;
    }

    electronic.save((err, doc) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log("hllooo")
            res.status(200).json({ msg: "Success" })
        }
    });

})


//Get all electronics
//GET /api/electronics
router.get('/', (req, res) => {
    ElectronicSchema.find((err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Unable to retrieve electronic data', error: err })
        }
        else {
            console.log(docs)
            res.status(200).json(docs);
        }
    });
});

//Get a single electronic object by Id
//GET /api/electronics/:id
router.get('/:id', (req, res) => {
    console.log("paramater is", req.params.id)
    ElectronicSchema.findById({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).json({ message: 'Unable to retrieve electronic object', error: err });
        } else {
            res.status(200).json(doc);
        }
    });
});

module.exports = router;