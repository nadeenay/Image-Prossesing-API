import express from "express";

const routes = express.Router();

routes.get('/',(req,res)=>{
  res.send("hello from routes");
});

export default routes ;
