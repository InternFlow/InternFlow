import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar-edit';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
function ImageUpload(props) {
  const {onImageUpload, isOpen, toggle, url} = props;
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);




  const onClose = ()=>{
    setImage(null);
  }
  const onCrop = view =>{
    setImage(view)
  }

  async function savePfp (Pfp) {
    try 
     { const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({pfpPath: Pfp})
          ,credentials: 'include'
        };
    
        await fetch(`http://localhost:5000/Condidat/editmyprofilepicture`, requestOptions);
        onImageUpload();
        toggle();
      }catch (error){
      console.log(error);
    }
    
    }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageDataUrl = image;
    const byteString = atob(imageDataUrl.split(',')[1]);
    const mimeString = imageDataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new File([ab], 'image', {type: mimeString});
    
   
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('http://localhost:5000/uploadImage/upload', formData);
      savePfp(response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchImage = async () => {
      try {
        await axios.get(url);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
        // Set the image URL to a default image or null, depending on your requirements
        setImageUrl(null);
      }
    };
    fetchImage();
  }, []);

  return (
    <div>
     
      <Modal isOpen={isOpen} toggle={toggle}>
   
      <form >
        <ModalHeader>Edit your profile picture</ModalHeader>
       <ModalBody>
        <Avatar
        width={400}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={imageUrl}
        />
        </ModalBody>
        <ModalFooter>
         <Button onClick={handleSubmit} color='primary'>Upload</Button>
        </ModalFooter>
      </form>
      </Modal>
    </div>
  );
}

export default ImageUpload;
