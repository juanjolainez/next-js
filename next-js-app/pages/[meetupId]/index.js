import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "./../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    ></MeetupDetail>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jj-test:<password>@cluster0.rkbiw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meeetupCollections = db.collection("meetups");

  const meetups = await meeetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://jj-test:<password>@cluster0.rkbiw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meeetupCollections = db.collection("meetups");

  console.log(meetupId);

  const meetup = await meeetupCollections.findOne({_id: new ObjectId(meetupId)});

  client.close();

  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
