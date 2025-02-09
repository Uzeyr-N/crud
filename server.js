//KEY POINTS
//CRUD APP -    Create,Read,Update,Delete
//express Terms -get ,
//a view engine is required to display the data to client- in this case - using ejs <> npm install ejs --save

//npm start //installs package lock.json - starts the node enviroment
console.log("Running Node");

const express = require("express"); //np install express // framework p top of node
const bodyParser = require("body-parser"); //npm install bodyparser// bodeparser npm package - allows input to be taken from the client side
const { MongoClient } = require("mongodb");
const app = express(); // Methods specific to express, as below (.send .get)
require("dotenv").config();
// const MONGODB = require("mongodb").MongoClient; //MONGO DB(database) //npm install mongodb save client inputs(data) for retrival -
const ejs = require("ejs");
const mongoString = process.env.MONGO_STRING_PASSWORD; //private do not share -- put in env files.;

async function Testconnect(mongoString) {
  try {
    console.log("Connected to database");
    const client = await MongoClient.connect(mongoString);
    const dB = client.db("quotes"); //saves user input to db from the qoutes route
    const qoutesCollection = dB.collection(`quotes`); //varaible to store  box of qoute collection

    //middleWare
    app.set("view engine", ejs);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'))
    app.use(bodyParser.json())


    //CRUD READ
    app.get("/", async (_req, res) => {
      try {
        //fetching data from collection
        let qoutes = await qoutesCollection.find().toArray(); //in the get section of express as we need to retrive the qoute
        console.log(qoutes);
        // Serving the index.html page ----
        // res.sendFile(__dirname + "/index.html");
        //updated to ejs to render content.
        res.render("index.ejs", { qoutes }); //called from above then renders to view engine
      } catch (error) {
        console.log(error, "line 37");
      }
    });

    //CRUD CREATE
    try {
      app.post("/qoutes", (req, res) => {
        // Handle POST request for form submission
        qoutesCollection
          .insertOne(req.body)
          .then((result) => {
            console.log("thank you for your submission");
            //send client back to homepage after form submission
            res.redirect("/");
          })
          .catch(
            (error) => console.error(error),
            console.log("declined quote l51")
          );
      });
    } catch (error) {
      console.log("NO POSTSection");
    }

    app.put('qoutes',(req,res)=> {
        console.log(req.body)
    })

    app.listen(8000, () => {
      // Listen on port 3000
      console.log("Server running on port 8000");
    });
    return client;
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

Testconnect(mongoString);

//MiddleWAre - npm bodyparser allows experss to grab the input from the form(app.post qoutes)
// app.use(bodyParseer.urlencoded({extended: true}))

// // const PORT = 5500
// app.listen(3000, () =>{
//     //3000(port is the endpoint) the function executes whne the endpoint is reached
//     console.log('port 3000')
// })

// app.get('/' , (req,res)=> { // '/' is the end point, like above...
//     //when the endpoint is reached the function is invoked to send the user a measssage or file
//     res.sendFile(__dirname + '/index.html')
//         //res.send('HELLOWwORLD')
//     //code has specified to to send the user a file
// })

// //create request add something to the server form element

// app.post('/qoutes', (req,res)=> {
//     console.log(req.body)
// })

//------------------------------------------------------------------------

// async function connect(mongoString) {
//     try {
//         console.log('Connected to database');
//         const client = await MongoClient.connect(mongoString);
//         const dB =  client.db('/quotes')//saves user input to db from the qoutes route
//         const qoutesCollection = db.collection('quotes')

//         //method(.use) tied to express//
//         // bodeparser npm package - allows input to be take from user
//         app.use(bodyParser.urlencoded({extended:true}))

//         app.get('/', (req, res) => {
//             // Serving the index.html page
//             res.sendFile(__dirname + '/index.html');
//         });

//         app.post('/quotes', (req, res) => {
//             // Handle POST request for form submission
//             //console.log(req.body); // Logs the form data sent from the client
//             //res.send('Form data received'); // Respond to client
//             qoutesCollection.insertOne(req.body)
//             .then(result => {
//                 console.log(result)
//             }).catch(error => console.error(error))

//         });

//         app.listen(8000, () => {
//             // Listen on port 3000
//             console.log('Server running on port 8000');
//         });

//         return client;
//     } catch (err) {
//         console.error('Database connection failed:', err);
//     }
// }

// connect(mongoString); // Ensure the MongoDB connection happens when the app starts
