const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PLAYER = mongoose.model('player');

router.get('/', (req, res) => {
    res.render("player/crud", {
        viewTitle: "Add Player"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var player = new PLAYER();
    player.fullName = req.body.fullName;
    // player.email = req.body.email;
    // player.mobile = req.body.mobile;
    player.city = req.body.city;
    player.save((err, doc) => {
        if (!err)
            res.redirect('player/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("player/crud", {
                    viewTitle: "Insert player",
                    player: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    PLAYER.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('player/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("player/crud", {
                    viewTitle: 'Update player',
                    player: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    PLAYER.find((err, docs) => {
        if (!err) {
            res.render("player/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving player list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    PLAYER.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("player/crud", {
                viewTitle: "Update PLAYER",
                player: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    PLAYER.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/player/list');
        }
        else { console.log('Error in player delete :' + err); }
    });
});

module.exports = router;