const express = require("express")
const data = require("./data")
const app = express()

app.get("/api/product", (req, res) => {
    res.send(data)
})


app.listen(4000,()=>{
    console.log(`http://localhost:4000`)
})