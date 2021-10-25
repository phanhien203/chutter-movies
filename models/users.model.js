const db = require('./database');
const fs = require('fs');
exports.findAccByEmailAndPass = async (email, password) => {
    let sql = `SELECT (email),(password) FROM users WHERE email = '${email}' AND password = '${password}'`;
    console.log('findAccByEmailAndPass: ', sql);
    try {
        const [results, field] = await db.query(sql);
        //console.log("DB: results of findAccByEmailAndPass: ", results);
        return results;
    } catch (err) {
        console.log(err);
    }
}

exports.updateIsLogin = async (email) => {
    var sql = `UPDATE users SET isLogin = 1, logoutTime = Now() - Now() WHERE email =  '${email}'`;
    console.log('UpdateIsLogin: ', sql);
    try {
        const [results, field] = await db.query(sql);
    } catch (err) {
        console.log(err);
    }
}


exports.checkIsLogin = async (email) => {
    let sql = `SELECT isLogin FROM users WHERE email = '${email}'`;
    console.log('checkLogin: ', sql)
    let check;
    try {
        const [results, field] = await db.query(sql);
        if (results[0].isLogin == 1) {
            check = true;
        } else {
            check = false;
        }
    } catch (err) {
        console.log(err);
    }
    return check;
};

exports.getUserByEmail = async (email) => {
    let sql = `SELECT * FROM users WHERE email = '${email}'`;
    console.log('getUserByEmail: ', sql)
    try {
        const [results, field] = await db.query(sql);
        //console.log(results);
        return results;
    } catch (err) {
        console.log(err);
    }
};



exports.updateProfile = async (account) => {
    let sql_withoutImage = `UPDATE users SET fullName = '${account.fullName}', synopsis = '${account.synopsis}',age = '${account.age}', phoneNumber = '${account.phoneNumber}' WHERE email = '${account.email}'`;
    let sql = `UPDATE users SET fullName = '${account.fullName}', synopsis = '${account.synopsis}',age = '${account.age}', phoneNumber = '${account.phoneNumber}', avatar = '${account.avatar}' WHERE email = '${account.email}'`;
    try {
        if(account.avatar != null){
        const [results, field] = await db.query(sql);
        }else{
        const [results, field] = await db.query(sql_withoutImage);
        }
    } catch (err) {
        console.log(err)
    }
}      

exports.updateLogOutTime = async (email) => {
    let sql = `UPDATE users SET isLogin = 0, logoutTime = Now()  WHERE email =  '${email}'`;
    console.log("update logoutTime: ", sql)
    try {
        const [results, field] = await db.query(sql);
    } catch (err) {
        console.log(err)
    }
}

exports.display = async () =>{
    let sql = `SELECT * FROM users WHERE 1 = 1`;
    console.log("admin display: ", sql );
    try{
        const [results, field] = await db.query(sql);
        return results;
    }catch(err){
        console.log(err);
    }
}

exports.add = async (account) =>{
    let sql = `INSERT INTO users(password, email, avatar, fullName, phoneNumber, age, synopsis)  VALUES ('${account.password}','${account.email}','${account.avatar}','${account.fullName}','${account.phoneNumber}','${account.age}','${account.synopsis}')`;
    console.log('admin add ', sql);
    try{
        const [results, field] = await db.query(sql);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.delete = async (email) =>{
    let sql = `DELETE FROM users WHERE email = '${email}'`;
    console.log('admin delete ', sql);
    try{
        const [results, field] = await db.query(sql);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}