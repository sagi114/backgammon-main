
const express = require("express");
const router = express.Router();
const api = "/user";

const mongoose = require('mongoose')
const User = require('../Models/user')

var connectedUsersList = [];
//const uri = `mongodb+srv://${username}:${password}@cluster0.6kcz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME ||'sela'}:${process.env.MONGO_PASSWORD||'Selaproject'}@backgammon.6kcz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
  useNewUrlParser : true,
  useUnifiedTopology : true
});
mongoose.connection.on('connected',()=>{
  console.log("MongoDB connected!");
})

//#region GET Functions
router.get(`${api}/all`,(req,res)=>{
    User.find().then((users)=>{
        res.status(200).json({
            users
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
    });
});



router.get(`${api}/:id`,(req,res)=>{
    const userId = req.params.id;

    User.findOne({_id: userId}).then((user)=>{
        if(user){
            res.status(200).json({
                "name" : `${user.username}`,
                "wins" : `${user.wins}`,
                "losts" : `${user.losts}`
            })
        }
        else{
            res.status(500).json({
                message : "Wrond email or password!"
            })
        }
    })
})
//#endregion

//#region PATCH Functions
router.patch(`${api}/win`,(req,res)=>{
    const userId= req.body.id;
    mongoose.set('useFindAndModify', false);
    User.findOneAndUpdate({_id : userId}, { $inc: {'wins': 1 } },{new : true}).then((user)=>{
        res.status(200).json({
                "name" : `${user.username}`,
                "wins" : `${user.wins}`,
                "losts" : `${user.losts}`
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
    })

});

router.patch(`${api}/lost`,(req,res)=>{
    const userId= req.body.id;
    mongoose.set('useFindAndModify', false);
    User.findOneAndUpdate({_id : userId}, { $inc: {'losts': 1 } },{new : true}).then((user)=>{
        res.status(200).json({
            "name" : `${user.username}`,
            "wins" : `${user.wins}`,
            "losts" : `${user.losts}`
        })
        }).catch(error=>{
            res.status(500).json({
                error
            })
    })

});
//#endregion

//#region POST Functions
router.post(`${api}/add`,(req,res)=>{
    console.log(req.body);
    const {email,password,username}=req.body;

    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        email :req.body.Email,
        password : req.body.Password,
        username : req.body.Name
    });

    user.save().then(()=>{
        res.status(200).json({
            message: 'Added successfully!'
        })
    }).catch(error=>{
        res.status(500).json({
            error
        })
    });
});

router.post(`${api}/login`,(req,res)=>{
    const email = req.body.Email;
    const password = req.body.Password
    mongoose.set('useFindAndModify', false);
    User.findOneAndUpdate({email :email, password : password},{'online' : true},{new : true}).then((user)=>{    
        res.status(200).json({
                "id" : `${user._id}`,
                "name" : user.username
            })
    }).catch((err)=>{
        res.status(500).json({
            message : "Wrong email or password!"
        })
    })

})
//#endregion
module.exports = router;