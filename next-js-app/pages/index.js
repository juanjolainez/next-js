import { MongoClient } from "mongodb";
import MeetupList from './../components/meetups/MeetupList';

function HomePage(props) {
    return <MeetupList meetups={props.meetups}>
    </MeetupList>
}

export async function getServerSideProps() {
    //fetch data from API 
    const client = await MongoClient.connect(
        "mongodb+srv://jj-test:<password>@cluster0.rkbiw.mongodb.net/meetups?retryWrites=true&w=majority"
      );
  
      const db = client.db();
  
      const meeetupCollections = db.collection('meetups');

      const meetups = await meeetupCollections.find().toArray();

      client.close();
      
    return {
        props: {
            meetups: meetups.map((meetup) => {
                return {
                    title: meetup.title, 
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString()
                }
            })
        }
    };
}

// export async function getStaticProps() {
//     //fetch data from API 
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//         revalidate: 10
//     };
// }

export default HomePage;