
import React ,{useEffect, useState} from "react";
// reactstrap components
import {
  Card, 
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Button,CardImg, Pagination, PaginationItem, PaginationLink
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import offerImage from "../uploads/offers/1681389235310-offers.jpg";
import axios from "axios";
import { API } from "config";
import Swal from "sweetalert2";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function CompanyProfilePage() {
  const id = localStorage.getItem("id");
  const offerId = localStorage.getItem('offerId');
  const [currentPage, setCurrentPage] = useState(1);



  const [offers, setOffers] = useState([]);
  console.log(id);
  
  const history = useHistory();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [Open, setOpen] = React.useState(1);


console.log(role)

  
const [userd, setUserData] = useState({
name: "",
lastName: "",
email: "",
occupation: "",
pfpPath: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",

skills: [],
local: [],
description: ""
}

);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });


  if (!token) {

    history.push('/sign-in');

  }
  const goedit = async (event) => {

    //history.push('/Edit-condidat-page');

    history.push(`/Edit-company-page`);


}
	
const handleAddOffer = async() => {
  history.push(`/AddOfferCompany`);
}
console.log(userd._id);
const handleEditOffer = async() => {
  history.push(`/EditOfferCompany`);
}



const handleDelete = async(offerId) => {
  const companyId = localStorage.getItem('id');
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      const response= await axios.delete(`${API}/Deletecompanies/${companyId}/offers/${offerId}`, {
            withCredentials: true
      })
        Swal.fire("Success!", "Offer Deleted successfully!", "success");

        //Refresh Page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
  history.push("/profile-company-page");

    }
  })

}

useEffect(() => {
  const token = localStorage.getItem('token');
  const companyId = localStorage.getItem('id');
  if (token) {
    fetch(`http://localhost:5000/Affichercompanies/${companyId}/offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setOffers(data);
      })
      .catch(error => console.error(error));
  }
}, []);


React.useEffect(() => {
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
        const userData = data.user;
        setUserData(userData);
      })
      .catch(error => console.error(error));
  }
}, []);

//--------------------------------- Pagination ---------------------------------------------------------//
const pageSize = 5;
  const pageCount1 = Math.ceil(offers.length / pageSize);
  const pages = Array.from({ length: pageCount1 }, (_, i) => i + 1);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const paginatedOffers = offers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  return (
    <>
<CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <div className="section profile-content" >
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={userd.pfpPath}
              />
            </div>
          <Row >
            <Col md="4" >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle  tag="h5" style={{fontWeight:"bold", fontSize: 22}}>{userd.name}</CardTitle>
                  {userd.occupation}
                </CardHeader>
                <CardBody>
                <ListGroup flush>
                <ListGroupItem className="justify-content-between">
              Locations :
                  <ul className="description">{userd.local.map((local, index)=>{
                    return( 
                        <>
                        <li>{local}</li>
                        </>
                    )})}</ul>
     
              </ListGroupItem>
            <ListGroupItem className="justify-content-between">
            Contact :
                    <h6 className="description">{userd.email} </h6>
  
             </ListGroupItem>
       
</ListGroup>
                  
                
                    
                    
                </CardBody>
              </Card >
            </Col>
            <Col md="8">
             
              <Card className="text-center text-md-left" >
              <CardHeader>About:</CardHeader>
              <CardBody style={{padding: "18p"}}>
                <h5 className="text-uppercase">Bio:</h5>
              <p>{userd.description}</p>
 
   

              </CardBody>
                </Card>
            
            </Col>
          </Row>
          <Row >
          
          <Col md="9">
            <Row>
            {paginatedOffers.map((offer) => (                    
              <Col md="4" key={offer.id}>
              <Card className="mb-4"  key={offer.id}>
              <CardImg top width="100%" src={offerImage} alt="Offer Image" />
                <CardBody>
                  <CardTitle tag="h5">{offer.title}</CardTitle>
                  <p>{offer.description}</p>
                  <Button color="primary" onClick={() => history.push(`/DetailsOffers/${offer._id}`)}>
                    View Details
                  </Button>
                  {/* <span style={{ marginTop: '120px' }} /> */}
                  <br></br>
                  <br></br>
                  <Button color="success" onClick={()=> history.push(`/EditOfferCompany/${id}/offers/${offer._id}`)} >
                    Edit Offer
                  </Button>

                  <br></br>
                  <br></br>
                  <Button color="danger" onClick={()=> handleDelete(offer._id)}>Delete Offer</Button>
                </CardBody>
              </Card>
            </Col>
            ))}  
            </Row>  
          
            <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          onClick={() => handlePageClick(currentPage - 1)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {pages.map((page) => (
                        <PaginationItem
                          key={page}
                          active={currentPage === page}
                        >
                          <PaginationLink onClick={() => handlePageClick(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={currentPage === pageCount1}>
                        <PaginationLink
                          onClick={() => handlePageClick(currentPage + 1)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                    <br></br>
                    <br></br>

          </Col>
        </Row>
          <Button
            variant= "primary"
            type="submit"
            onClick={()=> goedit()}
          >Edit profile</Button>
          <span style={{ marginRight: '120px' }} />
          <Button
            color="danger"
            type="submit"
            onClick={handleAddOffer}
          >
            Add Offer
          </Button>




           </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default CompanyProfilePage;
