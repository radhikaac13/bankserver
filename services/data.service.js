//import jsonwebtoken
const jwt=require('jsonwebtoken')

//import db.js
const db=require('./db')


//database
// db = {
//   1000: { "acno": 1000, "username": "neer", "password": 1000, "balance": 5000, transaction: [] },
//   1001: { "acno": 1001, "username": "naira", "password": 1001, "balance": 3000, transaction: [] },
//   1002: { "acno": 1002, "username": "neel", "password": 1002, "balance": 6000, transaction: [] },
//   1003: { "acno": 1003, "username": "nova", "password": 1003, "balance": 2000, transaction: [] }


// }

//register-asynchronous
var register = (username, acno, password) => {
//asynchronous
 return db.User.findOne({
   acno
  }).then(user=>{
   if(user){
    return {
      status: false,
      message: "Already existing user..Please Log In",
      statusCode: 401
    }
   }
   else
   {
     //insert db

    const newUser=new db.User({
      acno,
      username,
      password,
      balance: 0,
      transaction: []
    })
    newUser.save()
    return {
      status: true,
      message: "Register successfully",
      statusCode: 200
    }
   }
  })

  
}


//login-asynchronous
const login = (acno, pswd) => {

  return db.User.findOne({
    acno,
    password:pswd
  }).then(user=>{
    if(user){
      CurrentUser = user.username
      currentAcno = acno
      //token generation
      token= jwt.sign({
        //store the account number inside token
        currentAcno:acno //(account numbr ne tokente ullil ulla currentacnol store cheyunnu)

      },'supersecretkey12345')
      return {
        status: true,
        message: "Login successfull",
        statusCode: 200,
        CurrentUser,
        currentAcno,
        token
      }
    }
    else{
      return {
        status: false,
        message: "Invalid username or password",
        statusCode: 401
      }
    }
  })
  
}
  
  
  
  
  
  


//deposit-aynchronous
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)

return db.User.findOne({
  acno,
  password
}).then(user=>{
  if(user){
    user.balance+= amount
      user.transaction.push({
        type: "CREDIT",
        amount: amount
      })
      user.save()

      return {
        status: true,
        message: "deposit successfully..New balance is" + user.balance,
        statusCode: 200
      }
  }
  else{
    return {
      status: false,
      message: "Invalid username or password",
      statusCode: 401
    }
  }
})
}



//withdraw
const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({
    acno,
    password
  }).then(user=>{
    if(user){
    if(user.balance>amount){
      user.balance-= amount
        user.transaction.push({
          type: "DEDIT",
          amount: amount
        })
        user.save()
  
        return {
          status: true,
          message: "debitted successfully..New balance is" + user.balance,
          statusCode: 200
        }
      }
      else{
        return {
          status: false,
          message: "Insufficient balance",
          statusCode: 401
        }
      }
    }
    else{
      return {
        status: false,
        message: "Invalid username or password",
        statusCode: 401
      }
    }
  })
}





//transaction
const getTransaction = (acno) => {

  return db.User.findOne({
acno
  }).then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction
  
      }
    }
    else{
      return {
        status: false,
        message: "Invalid username or password",
        statusCode: 401
      }
    }
  })
}


//export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}