import fs from 'node:fs';
// Loading the dependencies.
import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// URL of the page we want to scrape the memes from
const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

async function download(url, idx) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./memes/image${idx}.jpg`, buffer, () =>
    console.log('finished downloading: ' + url),
  );
}

// await is valid in async functions
async function scrapeData() {
  // Fetch HTML of the page using axios
  const { data } = await axios.get(memeUrl);
  // Load HTML we fetched using cheerio
  const htmlDataLoaded = cheerio.load(data);
  // Select all the images
  const imgSelection = htmlDataLoaded('#images div a img');
  // Use .each jQuery method to loop through the images we selected
  imgSelection.each((idx, el) => {
    if (idx < 10) {
      // use download function and the url is passed through .attr method
      download(htmlDataLoaded(el).attr('src'), idx);
    } else {
      // else condition in order to break the loop, when the first 10 images are stored
      return false;
    }
  });
}

scrapeData();
