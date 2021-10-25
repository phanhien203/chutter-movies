const login_service = require('../services/login.services.js');
const user_service = require('../services/user.services')
const admin_service = require('../services/admin.services');
exports.registerEndpoint = (app) => {
    app.post('/login' , login_service.login );

    app.post('/logout', login_service.logout);

    app.post('/checkLogin' , login_service.checkLogin);

    app.post('/user' , user_service.user);

    app.post('/updateprofile', user_service.updateProfile);

    app.post('/admin/auth' , admin_service.auth);

    app.get('/admin/display' ,admin_service.dispplay);

    app.post('/admin/update' , admin_service.update);

    app.post('/admin/add', admin_service.add);

    app.post('/admin/delete' , admin_service.delete);
}