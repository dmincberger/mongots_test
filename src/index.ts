import express, { Express, Request, Response } from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import bodyParser, { BodyParser } from "body-parser";
import 'dotenv/config'

const body_parser = bodyParser

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json())

const uri: string = "mongodb+srv://TicketMaster:Qwerty123!@ticketcluster.zwtqu.mongodb.net/?retryWrites=true&w=majority&appName=TicketCluster";
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
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const comments = client.db("sample_mflix").collection<Comment_pull>('comments')
        let first_comment = await comments.findOne({})
        res.send(JSON.stringify(first_comment))

    } catch (e) {
        console.log("ERROR: " + e.error);

    }
});

app.get("/api/many_tickets/", async (req: Request, res: Response) => {
    try {
        const comments = await client.db("sample_mflix").collection('comments')
        const id: ObjectId = new ObjectId("5a9427648b0beebeb69579e7")
        const comment = await comments.findOne({ _id: id })
        console.log(comment);

        const comments_array = await comments.find().skip(20).limit(4).toArray();


        res.json(comments_array)

    } catch (e) {
        console.log("ERROR: " + e);
    }

})

app.patch("/api/edit_ticket", async (req: Request, res: Response) => {
    const api_body: Object = req.body
    const given_id: string = req.body["id"]
    const ticket_id: ObjectId = new ObjectId(given_id)

    const comments = await client.db("sample_mflix").collection('comments')

    await comments.updateOne({ _id: ticket_id },
        {
            "$set": { "name": "Filip Grudziecki" }
        }, {})
    const comment = await comments.findOne({ _id: ticket_id })

    res.send(JSON.stringify(comment))

})

app.listen(port, () => {
    console.log(`[server]: Server is connectning at http://localhost:${port}`);
});