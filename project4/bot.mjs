// require("dotenv").config();

// // importing the masto.js library, which connects to mastodon for us
// const m = require("masto");

import "dotenv/config";
import { createRestAPIClient } from "masto";

//read documentation

// this stores our login information and which server we are connecting to
const masto = createRestAPIClient({
  url: "https://networked-media.itp.io/",
  accessToken: process.env.TOKEN, // we are accessing TOKEN in .env file
});

async function retrieveData() {
  const url = "http://159.89.224.190:7001/all-posts";
  const response = await fetch(url);
  const json = await response.json();
  const posts = json.posts;
  let randNum = Math.floor(Math.random() * posts.length);
  let randText = posts[randNum].text;
  makeStatus(randText);
}

async function makeStatus(textStatus) {
  let textStatusUpdated = "Могу ли я заказать немного " + textStatus;
  const status = await masto.v1.statuses.create({
    status: textStatusUpdated,
    visibility: "public",
  });

  console.log(status.url);
}

setInterval(() => {
  // makeStatus()
  retrieveData();
}, 3600000);
