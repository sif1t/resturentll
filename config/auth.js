module.exports = {

    isAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            //req.isAuthenticated() will return true if user is logged in
            return next();
        } else {
            req.flash('error', 'Please loging');
            res.redirect("/login");
        }
    },

    isAdmin: function (req, res, next) {
        if (req.isAuthenticated()) {
            //req.isAuthenticated() will return true if user is logged in

            if (req.user.role == 'admin') {
                return next();
            } else {
                req.flash('error', 'You are not admin user!!!');
                res.redirect("/");
            }

        } else {
            req.flash('error', 'Please loging');
            res.redirect("/login");
        }
    }
}