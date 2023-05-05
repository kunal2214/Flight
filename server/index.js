import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://kunaljha2214:kunnu2214@cluster0.lpcqgk1.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log("DB Connected"))
.catch((err) => {console.log(err)})

const userschema = new mongoose.Schema({
    name: String,
    email: String,
        password: String
})
const User  = new mongoose.model("User", userschema)

app.post("/register", async(req,res) =>{
    const {name, email, password} = req.body
    const emailExists = await User.findOne({ email: req.body.email });

if (emailExists) {res.send({ message:"Email allready exists"});}
else{
    const user = new User({
        name, email, password
    })
user.save(res.send({ message: "Registered Successfully"}))
}
    
})
app.post("/login", async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({ email: req.body.email });

if (user) {
    if(password === user.password){
        res.send({ message: "Login Successfully", user: user})
    } else{
        res.send({ message: "Password Didn't Match"})
    }
}
else{ res.status(400).send({message: "User Not Found"});}
})

app.get("/", (req,res) => {
    res.send("Api Working")
})

app.listen(5000, () => {
    console.log("Server Running at 5000")
})
const flightschema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required:true},
    price: { type: Number, required: true },
    name: { type: String, required: true }
  }, {
    timestamps: true,
  })
  
  const Flight = mongoose.model('Flight', flightschema)

  app.post("/addFlight", async(req,res) =>{
    const {source, destination, date, price, name } = req.body
    const flight = new Flight({
        source, destination, date, price, name
    })
flight.save(res.send({ message: "Flight Added Successfully"}))
})


app.post('/search', async(req, res) => {
    const { source, destination, date } = req.body
    Flight.find({ source, destination, date })
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json(`Error: ${err}`))
})