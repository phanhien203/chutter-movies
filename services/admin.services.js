const user_model = require('../models/users.model');
const fs = require('fs');
const path = require('path');
exports.auth = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email == 'admin') {
        let user = await user_model.getUserByEmail(email);
        if (user[0].password == password) {
            await user_model.updateIsLogin(email);
            res.status(200).send("Quan Tri Vien Da Dang Nhap");
        } else {
            res.status(401).send("Loi thong tin");
        }
    } else {
        res.status(402).send("Loi thong tin");
    }
}

exports.dispplay = async (req, res) => {
    let display = await user_model.display();
    res.status(200).send(display);
}

exports.update = async (req, res) => {
    let account = {
        id: req.body.id,
        email: req.body.email,
        fullName: req.body.fullName,
        synopsis: req.body.synopsis,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
    }
    console.log('length',account.avatar.length);
    if(account.avatar.length > 256){
        account.avatar = decode_base64(account.avatar, account.id);
    }
    try {
        await user_model.updateProfile(account);
        res.status(200).send("admin da thay doi thong tin");
    } catch (err) {
        console.log(err)
        res.status(400).send("Admin da lam gi do sai sai ");
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

exports.add = async (req, res) => {
    let account = {
        password: req.body.password,
        email: req.body.email,
        fullName: req.body.fullName,
        synopsis: req.body.synopsis,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
    }
    // console.log("admin add: ", account);
    console.log('admin add', account.email);
    if(account.avatar.length > 256){
        account.avatar = decode_base64(account.avatar, account.id);
    }
    try{
        let results = await user_model.add(account);
        if (results == true) {
            res.status(200).send("Admin da them mot tai khoan moi");
        } else {
            res.status(401).send("Admin add loi ");
        }
    }catch(err){
        console.log(err);
    }
    
   
}

exports.delete = async (req, res) => {
    let email = req.body.email;
    console.log('admin delete ', email);
    let results = await user_model.delete(email);
    if(results == true){
        res.status(200).send('Admin da xoa mot tai khoan');
    }else{
        res.status(401).send('Admin delete loi');
    }
}