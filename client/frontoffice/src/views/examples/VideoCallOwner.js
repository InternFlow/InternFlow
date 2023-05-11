import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoCallOwner(props) {
    const {id} = useParams();
    
    const profile =  JSON.parse(localStorage.getItem("profile"));
    const userName = profile.name;
    
    
    useEffect(() => {
        console.log("waw");
      const domain = "https://internflow.daily.co/";
      console.log(domain,id)
      axios
        .get(`http://localhost:5000/video-call/create/${id}`)
        .then((res) => {
          if (res.status === 200) {
            const script = document.createElement("script");
            script.innerHTML = `window.DailyIframe.createFrame({
              iframeStyle: {
                position: "fixed",
                width: "100%",
                height: "100%",
                border: "0",
                zIndex: 9999
              },
              showLeaveButton: true,
              showFullscreenButton: true, 
              showUserNameChangeUI: false,
              userName: "${userName}",
              startVideoOff: true,
            }).join({
              url: "${domain}${id}",
            });`;
  
            document.body.appendChild(script);
          }
          else document.body.appendChild(<div>this room does not exist!</div>)
        })
        .catch((err) => console.log(err));
    }, [id]);
  
    return <div></div>;
}