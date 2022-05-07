const express = require("express")
const data = require("./data")
const cors = require("cors")
const app = express()

app.use(cors())
app.get("/api/products", (req, res) => {
    res.send(data.products)
})


app.listen(4000, () => {
    console.log(`http://localhost:4000`)
})