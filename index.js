//server creation

//1.import express
const express = require('express')
//importing dataservice
const dataServive=require('./services/data.service')

//server application create using express
 const app = express()

 //import jsonwebtoken
const jwt=require('jsonwebtoken')


 //parse json data
 app.use(express.json())

 //aplication specific middleware
 const appMiddleware=(req,res,next)=>{
   console.log("application specific middleware");
   next()
 }
//use middleware in app
app.use(appMiddleware)


//bank server

const jwtMiddleware = (req,res,next)=>{
  //fetch token
  try{
    token=req.headers['x-access-token']
  //verify token
  const data=jwt.verify(token,'supersecretkey12345')
  console.log(data);
  next()
  }
  catch{
    res.status(401).json({
      status:false,
      statusCode:401,
      message:"please login"
    })
  }

}



//register API
app.post('/register',(req,res)=>{
  //register solving
const result=dataServive.register(req.body.username,req.body.acno,req.body.password)
res.status(result.statusCode).json(result) // js leth client lek snd cheyan res venam..res nn status paranja method und....aa statusil value venam..alredy resultil status code nd..athinte akathnn statuscode ne edthu..ennit aa resultine json aaki
})


//login API
app.post('/login',(req,res)=>{
const result=dataServive.login(req.body.acno,req.body.pswd)
res.status(result.statusCode).json(result) // js leth client lek snd cheyan res venam..res nn status paranja method und....aa statusil value venam..alredy resultil status code nd..athinte akathnn statuscode ne edthu..ennit aa resultine json aaki
})

//deposit API
app.post('/deposit',jwtMiddleware, (req,res)=>{
  const result=dataServive.deposit(req.body.acno,req.body.password,req.body.amt)
  res.status(result.statusCode).json(result) // js leth client lek snd cheyan res venam..res nn status paranja method und....aa statusil value venam..alredy resultil status code nd..athinte akathnn statuscode ne edthu..ennit aa resultine json aaki
  })
  
//withdraw API
app.post('/withdraw',jwtMiddleware, (req,res)=>{
  const result=dataServive.withdraw(req.body.acno,req.body.password,req.body.amt)
  res.status(result.statusCode).json(result) // js leth client lek snd cheyan res venam..res nn status paranja method und....aa statusil value venam..alredy resultil status code nd..athinte akathnn statuscode ne edthu..ennit aa resultine json aaki
  })

//transaction API
app.post('/transaction',jwtMiddleware, (req,res)=>{
  const result=dataServive.getTransaction(req.body.acno)
  res.status(result.statusCode).json(result) // js leth client lek snd cheyan res venam..res nn status paranja method und....aa statusil value venam..alredy resultil status code nd..athinte akathnn statuscode ne edthu..ennit aa resultine json aaki
  })








//user request resolving

//GET REQUEST--to fetch data
app.get('/',(req,res)=>{
  res.send("GET REQUEST")
})

//POST REQUEST--to create data
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
  })

  //PUT REQUEST--to modify entire data
  app.put('/',(req,res)=>{
    res.send("PUT REQUEST")
  })

  //PATCH REQUEST--to modify partially
  app.patch('/',(req,res)=>{
    res.send("PATCH REQUEST")
  })

  //DELETE REQUEST--to delete data
  app.delete('/',(req,res)=>{
    res.send("DELETE REQUEST")
  })

//set up the port number to the server app
app.listen(3000,()=>{
    console.log("server started at 3000");
})