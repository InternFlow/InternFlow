const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.daily_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

async function tokenIsValid(token) {
  // Call out to Daily's meeting token REST endpoint to verify validity
  const url = `https://api.daily.co/v1/meeting-tokens/${token}`;
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const errMsg = "failed to validate token";
  const res = await axios.get(url, { headers }).catch((error) => {
    throw new Error(`${errMsg}: ${error}`);
  });
  return (res.status === 200);
}

async function getMeetingToken(roomName) {
  const req = {
    properties: {
      room_name: roomName,
      exp: Math.floor(Date.now() / 1000) + 86400,
      is_owner: true,
      
    },
  };

  const data = JSON.stringify(req);
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const url = `https://api.daily.co/meeting-tokens/`;

  const errMsg = "failed to create meeting token";
  const res = await axios.post(url, data, { headers }).catch((error) => {
    throw new Error(`${errMsg}: ${error})`);
  });
  if (res.status !== 200) {
    throw new Error(`${errMsg}: got status ${res.status})`);
  }
  return res.data?.token;
}

const getRoom = (room) => {
  console.log(`getting room https://internflow.daily.co/${room}`, "Bearer " + API_KEY);
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  console.log(`creating room https://internflow.daily.co/v1/rooms${room}`);
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
  .then((res) => {console.log(res);return res;})
    .then((res) => res.json())
    .then((json) => {
      return json;
    }) 
    .catch((err) => console.log("error:" + err));
};

router.get("/create/:id", async function (req, res) {
  const roomId = req.params.id;
  const room = await getRoom(roomId);
  if (room.error ) {
    const newRoom = await createRoom(roomId);
    if (!newRoom.error)res.status(200).send(newRoom);
  } else 
     res.status(200).send(room);
});

router.get("/get/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error ) {
    
    res.status(400).send({error: "failed to get room"});
  } else 
     res.status(200).send(room);
});


module.exports = router;
