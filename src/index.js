const express = require('express');

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Hello nodets!");
})

app.listen(PORT, () => {
    console.log("listening on PORT: " + PORT);
})