// Loading the dependencies.
const axios = require('axios');
const cheerio = require('cheerio');

// URL of the page we want to scrape the memes from
const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// await is valid in async functions
async function scrapeData() {
  // Fetch HTML of the page using axios
  const { data } = await axios.get(memeUrl);
  // console.log(data);
  // Load HTML we fetched using cheerio
  const htmlDataLoaded = cheerio.load(data);
  // Select all the images
  const imgSelection = htmlDataLoaded('#images div a img');
  // console.log(imgSelection);
  // Stores data for all images
  const images = [];
  // console.log(images);
  // Use .each method to loop through the images we selected
  imgSelection.each((idx, el) => {
    if (idx < 10) {
      // console.log(htmlDataLoaded(el).attr('src'));
      // Object holding url for each meme
      const meme = { memeLink: '' };
      // Select the url content of the src in the img elements
      // Store the url in the above object
      meme.memeLink = htmlDataLoaded(el).attr('src');
      // Populate image array with the meme data
      images.push(meme);
      console.log(images);
    }
  });
}
scrapeData();
