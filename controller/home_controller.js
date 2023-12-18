const userDB = require('../model/user');
const BmiCalculator = require('../score/BMICalculetor');
const BloodPressureCalculator = require('../score/BloodPressureCalculetor');

// home page
module.exports.home = function(req,res){
    //if any user is login then home page is not visible.
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('home',{
        title:"Home"
    })
}

// admin sign in page
module.exports.signInPageAdmin=function(req,res){
    //if any user is login then signin page is not visible.
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }
    return res.render('signin',{
        title:"AdminSignIn",
        isAdmin:true,
        url:'/admin/createSession'
    })
}

//admin sign up page
module.exports.signUpPageAdmin=function(req,res){
    //if any user is login then page is not visible.
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }

    return res.render('signup',{
        title:"AdminSignUp",
        isAdmin:true,
        url:'/admin/create'
    })
}

// user sign in page
module.exports.signInPageUser=function(req,res){
    //if any user is login then page is not visible.
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('signin',{
        title:"UserSignIn",
        isAdmin:false,
        url:'/user/create-session'
    })
}

//user sign up page
module.exports.signUpPageUser=function(req,res){
    //if any user is login then page is not visible.
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('signup',{
        title:"UserSignUp",
        isAdmin:false,
        url:'/user/create'
    })
}

//create user and admin
module.exports.create=async function(req,res){
    try{
        //first check password and confirm password match or not
        if(req.body.password != req.body.confromPassword){
            req.flash('error',"Password and Confirm Password not match");
            return res.redirect('back');
        }
        //check user already available in DB or not
        let user = await userDB.findOne({email:req.body.email});
        //if user not available in db then create new
        if(!user){
            //create new user or admin
            user = userDB.create(req.body);
            //here check create user is normal user or admin and according that redirect signin page
            if(req.body.isAdmin=="true"){
                req.flash('success','admin create successfully..!');
                return res.redirect('/admin/signin');
            }
            else{
                req.flash('success','user create successfully..!');
                return res.redirect('/user/signin');
            }
        }
        //if user already exist
        if(req.body.isAdmin=="true"){
            req.flash('error','user already exist..!');
            return res.redirect('/admin/signin');
        }
        else{
            req.flash('error','user already exist..!');
            return res.redirect('/user/signin');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

//create session of admin and user
module.exports.createSession=function(req,res){
    req.flash('success','Successfully Signin..!');
    if(req.body.isAdmin=="true"){
        return res.redirect('/admin/dashboard');
    }
    else{
        return res.redirect('/user/dashboard');
    }
}

//signout
module.exports.signout = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        req.flash('success','Successfully Signout..!');
        return res.redirect('/');
    })
}

//BMI calculetor
module.exports.BMICal=function(req,res){
    // call BmiCalculator 
    let bmi =BmiCalculator.BMI(req.body.height,req.body.weight);
    //if ajax req
    if(req.xhr){
        return res.status(200).json({
            BMI:bmi
        })
    }
    return res.redirect(back);
}

//blood pressure Calculetor
module.exports.bloodCal=function(req,res){
    // call pressure Calculetor
    let BloodPressure = BloodPressureCalculator.BloodPressure(req.body.systolic,req.body.diastolic);
    if(req.xhr){
        return res.status(200).json({
            BloodPressure:BloodPressure
        })
    }
    return res.redirect(back);

}