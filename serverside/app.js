import express from "express"
import env from "dotenv"
import Connection from "./connection.js"
import router from "./router.js"
import cors from 'cors'

env.config()
const app=express()

app.use(cors())
app.use(express.static("../clientside/dist"))
app.use(express.json({limit:"50mb"}))
app.use('/api',router)
app.get('/*',(req,res)=>{res.sendFile(path.resolve("../clientside/dist/index.html"))})
Connection().then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server at http://localhost:${process.env.PORT}`);
        
    })
})





