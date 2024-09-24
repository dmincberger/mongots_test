import express, { Express, Request, Response } from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import bodyParser, { BodyParser } from "body-parser";
import 'dotenv/config'
import path from "path";

const body_parser = bodyParser

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json())
app.use(express.static("static"))

const uri: string = "mongodb://127.0.0.1:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    minPoolSize: 30,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client_connect()

async function client_connect() {
    await client.connect()
}


interface Comment_pull {
    _id: string,
    name: string
    email: string
    movie_id: string
    text: string
    date: string
}



app.get("/", async (req: Request, res: Response) => {
    // try {
    //     // Connect the client to the server	(optional starting in v4.7)
    //     // Send a ping to confirm a successful connection
    //     await client.db("tickety").command({ ping: 1 });
    //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //     // client.db("tickety").collection("tickets").insertOne({ "_id": new ObjectId(), "name": "test" })
    //     console.log(await client.db("tickety").collection("tickets").find({}).toArray())
    //     res.send("UDALO SIE")

    // } catch (e) {
    //     console.log("ERROR: " + e.error);

    // }
    res.sendFile(path.join(__dirname, "static", "test.html"))
});


app.get("/api/microsoft_auth", async (req: Request, res: Response) => {
    res.send("Yay!")
})


app.listen(port, () => {
    console.log(`[server]: Server is connectning at http://localhost:${port}`);
});