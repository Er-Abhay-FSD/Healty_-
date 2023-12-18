const UserDB = require('../model/user');
const HealthDB = require('../model/healthRecord');
const FullHealthScore = require('../score/FullHealthScore');
const bloodPressureCal = require('../score/BloodPressureCalculetor'); 

// dashboard
module.exports.dashboard= async function(req,res){
    let score={overallScore:0,bmi:0};
    let BloodReport=null;
    //if user submited form user data then show or calculte healthscore
    if(req.user.medicalHistroy==true){ 
        let healthR = await HealthDB.findOne({user:req.user.id});
        if(healthR){
           score=FullHealthScore.checkScore(healthR);
            BloodReport = bloodPressureCal.BloodPressure(healthR.systolicPressure,healthR.diastolicPressure);
        }
    }
   
    return res.render('./user/dashboard',{
        title:"Dashboard",
        healthScore:score.overallScore,
        BMI:score.bmi,
        BloodReport:BloodReport
    })
}

//blood page
module.exports.bloodPressurePage=function(req,res){
    return res.render('./user/bloodPressure',{
        title:"Blood Pressure"
    });
}

//BMI page
module.exports.BMI = function(req,res){
    return res.render('./user/BMICalculetor',{
        title:'BMI'
    })
}

//full health data page
module.exports.fullHealthData = async function(req,res){
    try{
        //find health data 
        let healthData = await HealthDB.findOne({user:req.user.id});
        //if data is not found then show create data page
        if(healthData==null){
            return res.render('./user/fullHealth',{
                title:"FUll Health Info",
                url:'/user/createHealthRecord',
                healthData:healthData,
                btn:"Create"
            });
        }
        else{
            //if data found then show update page
            return res.render('./user/fullHealth',{
                title:"FUll Health Info",
                url:'/user/updateHealthRecord',
                healthData:healthData,
                btn:"Update"
            });
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create new health recored
module.exports.createHealthRecord = async function(req,res){
    try{
        //check user match or not 
        if(req.user.id == req.body.user){
            //if user match then create record and also update user medicalHistory false to true
            let newHealthRecord = await HealthDB.create(req.body);
            await UserDB.findByIdAndUpdate(req.user.id,{medicalHistroy:true})
            req.flash('success','Data Insert Successfully..!');
            return res.redirect('/user/dashboard');
        }
        req.flash('error','User Not Match Successfully..!');
        return res.redirect('/user/dashboard');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//update health record 
module.exports.updateHealthRecord = async function(req,res){
    try{
        //check user match or not 
        if(req.body.user == req.user.id){
            //update full
            let updatedData=await HealthDB.findByIdAndUpdate(req.params.id,req.body);
            if(updatedData){
                await UserDB.findByIdAndUpdate(req.user.id,{medicalHistroy:true});
            }
        }

        return res.redirect('/user/dashboard');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}