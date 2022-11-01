const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const ObjectId = require('mongodb').ObjectId;
const port = 3000
const cors = require('cors');

//pass WT0FseQmVWD4GKf3
//user id: crud

//vxftT8WQCrv7j2uA

const uri = `mongodb+srv://crud1:vxftT8WQCrv7j2uA@cluster0.tamfjg8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {

         await mongoose.connect('mongodb+srv://crud1:vxftT8WQCrv7j2uA@cluster0.tamfjg8.mongodb.net/?retryWrites=true&w=majority');
        console.log(' Mongoose  connection succesfully');
        await client.connect();
         console.log(' DataBase connection succesfully');
        const database = client.db('crud1');
        const usersCollection = database.collection('users');

   const dataSchema = new mongoose.Schema({
     fname: {
         required: true,
         type: String
     },
     lname:{
        required: true,
         type: String

     },
    email:{
       required: true,
       type: String

     },
     phone: {
        required: true,
        type: Number
     },
     password: {
        required: true,
        type: Number
     },
     address:{
        required: true,
        type: String

     },
   created_at:{
        required: true,
        type: String

     },
    updated_at:{
        required: true,
        type: String

     }
})

module.exports = mongoose.model('user', dataSchema)
        
     //Post Method
    //  urlencodedParser, function (req, res)
     app.post('/user', jsonParser, async (req, res) => {

      const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password:req.body.password,
        address: req.body.address,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at

       }

      const user =  await  usersCollection.insertOne(data);
          console.log(user);
            res.json(user);
    })
     
   
     app.get('/user', async (req, res) => {
            const cursor = usersCollection.find({}).skip(4).limit (5);
            const user = await cursor.toArray();
            res.send(user);

        })
//     app.get("/user",(req,res=>{
//         const page=req.query.page
//         const limit=req.query.limit;
//         const startIndex=(page,1);
//         const endIndex=page.limit;
//         const result=user.slice(startIndex,)

//   }))

         app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.json(result);

        });


           app.put('/user/:id', jsonParser, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

           
            const data = {
              fname: req.body.fname,
              lname: req.body.lname,
              email: req.body.email,
              phone: req.body.phone,
              password:req.body.password,
              address: req.body.address,
              created_at:req.body.created_at,
              updated_at:req.body.updated_at,
            

          }

    
            const result = await usersCollection.findOneAndUpdate(query,{$set: data},{ upsert: true });
            res.json(result.value);

        });



            app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.json(result);

        });



    }
    finally {
        //await client.close();   
    }

}
run().catch(console.dir);




app.get('/',function(req,res)
{
     res.send('Hello World!');
});

app.listen(port, () => {

  console.log(`running server ${port}`)
});
