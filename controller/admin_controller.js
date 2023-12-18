const HealthDB = require('../model/healthRecord');
const UserDB = require('../model/user');

//dashboard
module.exports.dashboard= async function(req,res){
   try{
      //here finding all users of web app
      let users = await UserDB.find({});
      return res.render('./admin/dashboard',{
         title:"Admin Dashboard",
         users:users
        })
   }
   catch(err){
      console.log(err);
      return res.redirect('back');
   }
}

//delete user
module.exports.deleteUser = async function(req,res){
   try{
      //find user and delete user form DB
      await UserDB.findByIdAndDelete(req.params.id);
      // notification 
      req.flash('success','Delete User Successfully..!');
      
      return res.redirect('back');
   }
   catch(err){
      console.log(err);
      //notification
      req.flash('error','Internal Error..!');
      return res.redirect('back');
   }
}

//view user 
module.exports.viewUser=async function(req,res){
   try{
      //find health record in HealthDB
      let healthRecord = await HealthDB.findOne({user:req.params.id});
      //if health record found then 
      if(healthRecord != null){
         return res.render('./admin/viewUser',{
            title:"View User",
            healthRecord:healthRecord
         })
      }
   }
   catch(err){
      console.log(err);
      return res.redirect('back');
   }
}