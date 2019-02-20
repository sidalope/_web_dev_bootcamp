let     express         = require("express"),
        router          = express.Router(),
        passport        = require("passport"),
        User            = require("../models/user");


//Root Route
router.get("/", function(req, res){
    res.render("landing.ejs");
});

//show registeration form
router.get("/register", function(req, res){
    res.render("register.ejs");
});

//sign up logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome To Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login.ejs");

});

//login POST - login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});


//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;