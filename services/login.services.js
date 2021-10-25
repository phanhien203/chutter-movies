const bodyParser = require('body-parser');
const user_model = require('../models/users.model');
exports.login = async (req, res) => {
    console.log("login-service: login")
    let email = req.body.email;
    let password = req.body.password;
    console.log('Login Email and Pass: ', email, password);
    let results = await user_model.findAccByEmailAndPass(email, password);
    console.log('result of findAccByEmailAndPass ', results)
    if (results.length != 0) {
        res.status(200).send(results[0]);
        user_model.updateIsLogin(email);
    } else {
        res.status(401).send('System: Login false');
    }
}

exports.checkLogin = async (req, res) => {
    console.log("login-service: checkLogin")
    let email = req.body.email;
    let check = await user_model.checkIsLogin(email);
    if (check == true) {
        res.status(200).send("System: Tai khoan da dang nhap");
    } else {
        res.status(401).send("System: Tai khoan chua dang nhap");
    }
}

exports.logout = async (req, res) => {
    console.log("login-service: logout")
    let email = req.body.email;
    user_model.updateLogOutTime(email);
    res.status(200).send("System: Tai khoan da logout");
}

exports.signup = async (req, res) => {
    console.log("login-service: signup")
    let account = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        fullName : 'Your Full Name',
        age : 'Your Age',
        phoneNumber : 'Your Phone Number',
        synopsis : 'Synopsis About Yourself',
        
    }
    let check = await user_model.getUserByEmail(account.email);
    console.log(check);
    if (check.length != 0) {
        res.status(401).send("System: Tai khoan da ton tai");
    } else {
        await user_model.signup(account);
        await user_model.updateIsLogin(account.email);
        // await user_model.updateProfile(account); 
        let message = {
            fromEmail: 'admin@gmail.com',
            toEmail: account.email,
            content: 'Welcome to BKZalo!!!',
            contentType: 'text'
        }
        let messageID = await message_model.saveMessageToDataBase(message, 'sent');
        lastchat_model.insertLastChat(message, messageID);
        await socket_service.emitMessage(message);
        res.status(200).send("System: Dang ky thanh cong");
    }
}