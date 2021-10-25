const user_model = require('../models/users.model');
const fs = require('fs');
const path = require('path')
exports.user = async (req, res) => {
    console.log('user-service: user');
    let email = req.body.email;
    let check = await user_model.checkIsLogin(email);
    if (check == true) {
        let results = await user_model.getUserByEmail(email);
        res.status(200).send(results);
    } else {
        res.status(400).send("System: Please login to continues");
    }
}


function decode_base64(base64String, filename) {
    let base64Image = base64String.split(';base64,').pop();
    let avatarString = base64String.toString();
    let end = avatarString.indexOf(';');
    let fileType = avatarString.slice(11, end);
    console.log('fileType', fileType);
    let avatarDir = `/image/avatar/` + `${filename}.${fileType}`;
    console.log('avatarDir', avatarDir);
    fs.writeFile(path.join(__dirname, `../public`, avatarDir), base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created');
    });
    return avatarDir;
}

exports.updateProfile = async (req, res) => {
    console.log('user-service: updateProfile');
    let account = {
        id: req.body.id,
        email: req.body.email,
        fullName: req.body.fullName,
        synopsis: req.body.synopsis,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
    }
    // // console.log(account)
    console.log('length',account.avatar.length);
    if(account.avatar.length > 256){
        account.avatar = decode_base64(account.avatar, account.id);
    }
    let check = await user_model.checkIsLogin(account.email);
    console.log(account)
    if (check == true) {
        await user_model.updateProfile(account)
        res.status(200).send("System: Update success!");
    } else {
        res.status(401).send("System: Please login to update profile");
    }
}
