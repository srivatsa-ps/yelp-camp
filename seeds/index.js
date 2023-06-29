const mongoose= require('mongoose')
const axios= require('axios')
const Campground =require('../models/campground')
const cities= require('./cities')
const {places,descriptors}=require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'tP52HzCuydy6l8Mt5CZD_BsvroT6oK2W9iCFn3AXFic',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }
  const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 20; i++) {
      // setup
      const placeSeed = Math.floor(Math.random() * places.length)
      const descriptorsSeed = Math.floor(Math.random() * descriptors.length)
      const citySeed = Math.floor(Math.random() * cities.length)
   
      // seed data into campground
      const camp = new Campground({
        image: await seedImg(),
        title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
        location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
        author:'649d2f369090eee8612b3ef6',
        price:1000,
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
      })
   
      await camp.save()
    }
  }

seedDB().then(() => {
    mongoose.connection.close();
})