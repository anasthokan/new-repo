const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));




main().then((console.log("Connected DB"))).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/email');
}


const emailSchema=new mongoose.Schema({
    email:String
});

const Email=mongoose.model("Email",emailSchema);




app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/email",async (req,res)=>{
    let {email}=req.body;
    let mail= new Email({email});
    await mail.save();
    res.send(mail)
})

app.listen(8080,()=>{
    console.log("App is listening at port 8080");
})