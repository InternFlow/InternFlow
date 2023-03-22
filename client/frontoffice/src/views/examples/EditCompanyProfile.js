/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect , useRef} from 'react';
import {BsPencilSquare, BsXSquare } from 'react-icons/bs';
import { API } from "../../config";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

const  company ={
    name: "",
    local: [],
    email: "",
    imageUrl: "",
    description: "",
    services: [""]
}



function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [userData, setUserData] = useState(null);
  const [isNameEditMode, setIsNameEditMode] = useState(false);
  const [isNameEditButton, setIsNameEditButton] = useState(false);
  const [isBioEditMode, setIsBioEditMode] = useState(false);
  const [isBioEditButton, setIsBioEditButton] = useState(false);
  const [isPfpEditButton, setIsPfpEditButton] = useState(false);
  const [name, setName] = useState();
  const inputRef = useRef(null);
  const [bio, setBio] = useState();
  const [isLocationsEditMode, setIsLocationsEditMode] = useState(false);
  const [isLocationsEditButton, setIsLocationsEditButton] = useState(false);
  const [locations, setLocations] = useState([]);
  const [tempLocations, setTempLocations] = useState([]);
  const [email, setEmail] = useState();
  const [tempBio, setTempBio] = useState();

  const handlePencilClick = () => {
    console.log("pencil clicked");
    inputRef.current.click(); 
  };
  
  const handlePfpUpload = (event) => {
    console.log("pfp upload clicked");
    const file = event.target.files[0]; // get the selected file
    // TODO: handle file upload
  };
  
 
  const saveName = () => {
    setIsNameEditMode(false);
    saveUser();
  };


  const saveBio = () => {
    // call the method to save the bio changes
    // then exit edit mode
    setIsBioEditMode(false);
    saveUser();
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  
  
  const cancelBioChanges = () => {
    // reset the bio value and exit edit mode
    setBio(tempBio);
    setIsBioEditMode(false);
  };
  
  

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };


 

  
  const handleLocationDelete = (index) => {
    setLocations(prevLocations => {
      const newLocations = [...prevLocations];
      newLocations.splice(index, 1);
      return newLocations;
    });
  };
  

  const saveUser=async  ()=> {
    const id = localStorage.getItem("id");
try 
   { const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, description: bio, email:email, local: locations})
        ,credentials: 'include'
      };

      await fetch(`${API}/Condidat/editprofile/${id}`, requestOptions);
      getProfile();
}catch (error){
    console.log(error);
}

  }

  const handleSaveLocation = () =>{
    setIsLocationsEditMode(false);
    saveUser();

  }

  async function getProfile(){
    
        const token = localStorage.getItem('token');
        if (token) {
          fetch('http://localhost:5000/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
            ,credentials: 'include'
          })
            .then(response => response.json())
            .then(data => {
              setName(data.user.name);
              setEmail(data.user.email);
              setLocations(data.user.local);
              setBio(data.user.description);
              console.log(userData.experiences);
              setUserData(userData);
            })
            .catch(error => console.error(error));
        }
      }

  useEffect(()=>{getProfile();}, []);
  
    console.log(JSON.stringify(userData))

    const handleNameChange = (event) => {
        setName(event.target.value);
      }
// function to handle changes to an input value
const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

   
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
    
  <ExamplesNavbar />
  <ProfilePageHeader />
  <div className="section profile-content">
    <Container>
      <div className="owner">
      <div
  className="avatar"
  onMouseEnter={() => setIsPfpEditButton(true)}
  onMouseLeave={() => setIsPfpEditButton(false)}
>
  <div style={{ position: "relative" }}>
    <img
      alt="..."
      className="img-circle img-no-padding img-responsive"
      src={company.imageUrl}
    />
    {isPfpEditButton && (
     <div > <label for="file-input"> <BsPencilSquare
        fontSize={30}
        className="pencil-icon"
        color="primary"
        style={{ cursor: "pointer", position: "absolute", bottom: "30", right: "15" }}
        click={handlePencilClick}
      /> </label>
      <input
            id='file-input'
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handlePfpUpload}
          /></div>
    )}
  </div>
</div>


        <div className="name">
      {isNameEditMode ? (
        <>
          <FormGroup>
            <Row>
                <Col></Col><Col></Col>
                <Col><Input placeholder="Default" type="text" value={name} onChange={handleNameChange} /></Col>
                <Col></Col><Col></Col>
                </Row>  <Row style={{marginTop:"10px"}}> <Col>
                <Button
                  className="btn-round mr-1"
                  color="success"
                  outline
                  type="button"
                  onClick={saveName}
                >Save</Button>
                <Button
                  className="btn-round mr-1"
                  color="warning"
                  outline
                  type="button"
                  onClick={()=> setIsNameEditMode(false)}
                >Cancel</Button>
                </Col>
            </Row>
            </FormGroup>
        </>
      ) : (
        <>
          <h4 className="title"  onMouseEnter={()=> setIsNameEditButton(true)} onMouseLeave={()=> setIsNameEditButton(false)}>
            {name}    {isNameEditButton ? (
            <BsPencilSquare class="bi bi-pencil-square" color='primary' 
            style={{ cursor: "pointer" , marginLeft:"20px"}} onClick={()=> setIsNameEditMode(true)}>
            </BsPencilSquare>
          )
            :(<></>)}<br />
          </h4>
        </>
      )}
    </div>
      </div>
      <Row>
        <Col className="ml-auto mr-auto text-center" md="6">
        {isBioEditMode ? (
  <>
    <FormGroup>
      <Row>
        <Col><Input type="textarea" value={bio} onChange={handleBioChange} /></Col> 
      </Row><Row style={{marginTop:'8px'}}>
        <Col md="6" ><Button color="success" onClick={saveBio}>Save</Button></Col> 
        <Col md="6"><Button color="warning" onClick={cancelBioChanges}>Cancel</Button></Col> 
      </Row>
    </FormGroup>
  </>
) : (
  <>
    <div onMouseEnter={()=> setIsBioEditButton(true)} onMouseLeave={()=> setIsBioEditButton(false)}>
        <h4 style={{fontWeight:"bold"}}>About</h4>
    <p >
      {bio} </p>{isBioEditButton ? (
      <BsPencilSquare class="bi bi-pencil-square" color='primary' 
      style={{ cursor: "pointer", marginBottom:"8px", fontSize:18}} onClick={()=> setIsBioEditMode(true)}>
      </BsPencilSquare>

    )
      :(<></>)}
    </div>
  </>
)}


<Row style={{marginTop:"10px"}}>
    <Col className="ml-auto mr-auto text-center" md="6">
      <h4 style={{fontWeight:"bold", marginBottom:"10px"}}>Locations</h4>
      <div>
      {!isLocationsEditMode ? (
      <div  onMouseEnter={()=> setIsLocationsEditButton(true)} onMouseLeave={()=> setIsLocationsEditButton(false)}>
        {locations.map((location, index) => (
          <h6 key={index}>
            {location}
          </h6>
        ))}

    {(isLocationsEditButton || locations.length === 0) &&  (
              <>
                <BsPencilSquare className="bi bi-pencil-square" color="primary" style={{ cursor: "pointer", marginLeft:"20px" }}
                 onClick={() => {setIsLocationsEditMode(true); setTempLocations(locations)}} />

              </>
            )} 
         </div>) : (
          <div>
            <FormGroup>
              <Row>
                
                <Col >{locations.map((location, index) => (
          <div key={index}>
            <Row>
            <Input style={{marginTop:"10px"}} 
            placeholder="Location" 
            type="text" 
            value={location}
            onChange={(e) => handleLocationChange(index, e.target.value)}
            />
             <BsXSquare className="bi bi-x-square" 
             color="primary" 
             style={{ cursor: "pointer", marginLeft:"10px" }} 
             onClick={() => handleLocationDelete(index)} />
             </Row>
          </div>
        ))}</Col>
                
              </Row>
              <Row>
              <Button className="btn-round " color="success" outline type="button" onClick={()=> setLocations(prevState =>[...prevState,""])} ></Button>
              </Row>
              <Row style={{marginTop:"10px"}}> 
               <Col>
                  <Button className="btn-round " color="success" outline type="button" onClick={() => handleSaveLocation()} >
                    Save</Button></Col><Col>
                  <Button className="btn-round " color="warning" outline type="button" onClick={() => {setIsLocationsEditMode(false);setLocations(tempLocations)}} >
                    Cancel</Button></Col>
                
              </Row>
            </FormGroup>
          </div>
        )}
      </div>
    </Col>
  </Row>


          <br />
          <Button className="btn-round" color="default" outline>
            <i className="fa fa-cog" /> Settings
          </Button>
        </Col>
      </Row>
      <br />
      
      {/* Tab panes */}
      
    </Container>
  </div>
  <DemoFooter />
</>

  );
}

export default ProfilePage;
