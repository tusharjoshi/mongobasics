import 'dotenv/config';
import { MongoClient } from 'mongodb';


const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.est9fpk.mongodb.net/?retryWrites=true&w=majority`;
console.log(`URL used: ${url}`);

export const createPost = async (req, res, next) => {
    console.log("POST endpoint called.")
    const client = new MongoClient(url);

    const newPost = {
        title: req.body.title,
        content: req.body.content,
    }
    
    try {
        await client.connect();
        const db = client.db('mongo-client');
        const collection = db.collection('posts');
        await collection.insertOne(newPost);
        res.json(newPost);
    } catch(error) {
        res.json({message: 'Error creating post.'});
    } finally {
        await client.close();
    }
};

export const getPosts = async (req, res, next) => {
    console.log("GET endpoint called.");
    const client = new MongoClient(url);
    
    try {
        await client.connect();
        const db = client.db('mongo-client');
        const collection = db.collection('posts');
        const posts = await collection.find().toArray();
        res.json(posts);
    } catch(error) {
        res.json({message: 'Error fetching posts.'});
    } finally {
        await client.close();
    }  
}