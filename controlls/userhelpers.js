const db = require('../config/connection');
const objectId = require('mongodb').ObjectId;
const {check} = require('express-validator');



module.exports = {
    addUser: (userData) => {
        return new Promise(async(resolve, reject) => {
            // let userObj = {}
            // let user =await db.get().collection('userdata').findOne({email: userData.email})
                
            // console.log(user)
            // if(user) {
            //     resolve('Email already in use')
                
            // } else {
            //     userObj = {
            //         name: userData.name,
            //         email: userData.email,
            //         gender: userData.gender,
            //         sallry: userData.sallry,
            //         profession: userData.porfession,
            //         status: userData.status

            //     }
            db.get().collection('userdata').insertOne(userData).then((response) => {
                resolve()
            })
            //}   
        })
    },

    getAllUser: () => {
        return new Promise(async(resolve, reject) => {
            let users =await db.get().collection('userdata').find().toArray()
            console.log(users)
            resolve(users)
        })
    },

    getupdateUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('userdata').findOne({_id: objectId(userId)}).then((response)=> {
                console.log(response)
                resolve(response)
            })
            
        })
    },

    updateUser: (userId,userDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection('userdata').updateOne({_id: objectId(userId)},
            {
                $set: {
                    name: userDetails.name,
                    email: userDetails.email,
                    gender: userDetails.gender,
                    sallary: userDetails.sallary,
                    profession: userDetails.profession,
                    status: userDetails.status
                }
            }).then((response) => {
                resolve()
            })
        })
    },

    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('userdata').deleteOne({_id: objectId(userId)}).then((response) => {
                console.log(response)
                resolve(response)
            })
        })
    }
}