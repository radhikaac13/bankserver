//db connection

//import mongoose
const mongoose=require('mongoose')

//connection string --to connect db and server
mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true
})


//model definition of db(collection)
const User = mongoose.model('User',{
    acno: Number, 
    username: String, 
    password: String, 
    balance: Number,
    transaction: [] 
})

module.exports={
    User
}
