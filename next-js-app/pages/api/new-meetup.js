import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://jj-test:<password>@cluster0.rkbiw.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meeetupCollections = db.collection('meetups');
    const result = await meeetupCollections.insertOne({
        title: title,
        image: image,
        address: address,
        description: description
    });

    console.log(result);

    client.close();

    res.status(201).json({
        message: 'Meetup'
    });

  }
}

export default handler;
