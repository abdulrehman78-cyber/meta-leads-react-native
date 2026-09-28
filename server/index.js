const express = require ("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("firebase admin initialized successfully");
const app = express();
app.use(express.json());

const MY_SECRET_TOKEN = "myassignmentsecret123";

app.get("/test-lead", async (req,res)=>{
  try{
    const fakeLead = {
      fullName:"Test User",
      email:"abduo@icloud.com",
      phoneNumber:+919588443,
      platform:"local Test Server"
    };

    const docRef = await db.collection("leads").add({
      data:fakeLead,
      receivedAt: new Date().toISOString()
    });

    res.status(200).json({
      success:true,
      message:"Fake lead dropped into firestore successfully",
      documentId:docRef.id
    });
    
  }catch(error){
    console.error("Error adding fake lead",error);
    res.status(500).send("Database error occurred");
  }
});

app.get("/webhook",(req,res)=>{
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if(mode === "subscribe" && token === MY_SECRET_TOKEN){
    res.send(challenge);
  }else{
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req,res)=>{
  console.log("Incoming Meta Webhook", JSON.stringify(req.body, null, 2));
  try{
    await db.collection("leads").add({
      data:req.body,
      receivedAt:new Date().toString()
    });

  }catch (error){
    console.log("We got Error while saving Metas Lead:",error)
  }
  res.sendStatus(200);
});

app.listen(3000,()=>{
  console.log("Server running port 3000")
})
