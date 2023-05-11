const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 80;

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

app.get('/', async (req, res) => {
    await run(res).catch(console.dir);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

async function run(res) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("test-vpc").command({ ping: 1 });
        await client.db("test-vpc").collection("users").insertOne({ "name": "Eduardo" });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return res.status(200).send('Conexão bem-sucedida com o MongoDB Atlas');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Falha na conexão com o MongoDB Atlas');
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
