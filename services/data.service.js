//import jsonwebtoken
const jwt=require('jsonwebtoken')


//database
db = {
  1000: { "acno": 1000, "username": "neer", "password": 1000, "balance": 5000, transaction: [] },
  1001: { "acno": 1001, "username": "naira", "password": 1001, "balance": 3000, transaction: [] },
  1002: { "acno": 1002, "username": "neel", "password": 1002, "balance": 6000, transaction: [] },
  1003: { "acno": 1003, "username": "nova", "password": 1003, "balance": 2000, transaction: [] }


}

//register
var register = (username, acno, password) => {
  if (acno in db) {
    return {
      status: false,
      message: "Already existing user..Please Log In",
      statusCode: 401
    }
  }
  else {
    //insert in db
    db[acno] = {
      acno,
      username,
      password,
      "balance": 0,
      transaction: []
    }
    console.log(db);
    return {
      status: true,
      message: "Register successfully",
      statusCode: 200
    }
  }

}


//login
const login = (acno, pswd) => {

  if (acno in db) {
    if (pswd == db[acno]["password"]) {
      CurrentUser = db[acno]["username"]
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
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 401
      }
    }
  }
  else {
    return {
      status: false,
      message: "User does not exist",
      statusCode: 401
    }
  }
}


//deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)
  if (acno in db) {
    if (password == db[acno]["password"]) {
      db[acno]["balance"] += amount
      db[acno].transaction.push({
        type: "CREDIT",
        amount: amount
      })

      return {
        status: true,
        message: "deposit successfully..New balance is" + db[acno]["balance"],
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 401
      }
    }
  }
  else {
    return {
      status: false,
      message: "User does not exist",
      statusCode: 401
    }
  }

}


//withdraw
const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  if (acno in db) {
    if (password == db[acno]["password"]) {
      if (db[acno]["balance"] > amount) {
        db[acno]["balance"] -= amount
        db[acno].transaction.push({
          type: "DEBIT",
          amount: amount
        })

        return {
          status: true,
          message: "withdrawed successfully..New balance is" + db[acno]["balance"],
          statusCode: 200
        }
      }
      else {
        return {
          status: false,
          message: "insufficient balance",
          statusCode: 422
        }
      }

    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 401
      }
    }
  }
  else {
    return {
      status: false,
      message: "User does not exist",
      statusCode: 401
    }
  }
}


//transaction
const getTransaction = (acno) => {
  if (acno in db) {
    return {
      status: true,
      statusCode: 200,
      transaction: db[acno].transaction

    }
  }
  else {
    return {
      status: false,
      message: "User does not exist",
      statusCode: 401
    }
  }
}


//export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}