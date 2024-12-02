import  express from "express"
import pg from "pg"
import axios from "axios"
import bodyParser from "body-parser";
import fs from "fs"
import { error } from "console";
import { get } from "http";
let port= 3000;
const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

async function getImages(isbn){
const resp =await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`, {
    responseType: "text",
    responseEncoding: "base64",
  })
  .then((resp) => {
    //console.log(resp.data);
    fs.writeFileSync(`./public/assets/${isbn}.jpg`, resp.data, { encoding: "base64" });
  }).catch((error)=>{console.log(error)})

}
app.get("/",async(req,res)=>{
  
  await getImages(9788173711466)

  res.render("index.ejs")
})














//console.log("hello anish ")

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})