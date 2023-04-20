/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { API } from "../../config";
import React, { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Pagination,
  Button,
  PaginationItem,
  PaginationLink,
  Input,
  Form,
  InputGroupAddon,
  InputGroup,
  InputGroupText
} from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ViewOffers() {
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');



    const [pageNumber, setPageNumber] = useState(0);
    const offersPerPage = 5;
    const pagesVisited = pageNumber * offersPerPage;

    const history = useHistory();


    async function getUsers(){
            fetch(`${API}/Offer/getOffers`, {
              credentials: 'include'
        })
      .then((response) => response.json())
      .then((data) => setOffers(data));
    }

    useEffect(()=>{getUsers()},[]);

    //SEARCH
    // async function searchOffers() {
    //   fetch(`${API}/Offer/search/${searchTerm}`,{
    //     credentials: 'include'
    //   })
    //   .then((res)=> setSearchResults(res.data))
    //   .catch(error => console.error(error));
    // }

    // useEffect(()=>{searchOffers()},[]);

    // const handleSubmit = async(e) => {
    //   e.preventDefault();

    //   try {
    //     await fetch(`${API}/Offer/search?query=${searchTerm}`, {
    //       method: "GET",
    //       credentials: 'include',
    //     })
    //   .then((res)=> setSearchResults(res.data))
 
    //   } catch (error) {
    //     console.error("There was a problem with the SEARCH operation:", error);
    //   }
    // }
    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get(`${API}/Offer/search?query=${searchText}`);
        setOffers(res.data);
      } catch (error) {
        console.error(error);
      }
    };


    const deleteOffer = async (id) => {
      const result = window.confirm("Are you sure you want to delete?");
      await axios.delete(`http://localhost:5000/Offer/DeleteOffer/${id}`, {
        withCredentials: true
      })
      .then((res) => {
        history.push("/admin/viewOffer");
      });
      getUsers();

    }


    const offersWithImageUrl = offers.map(offer => ({
      ...offer,
      imageUrl: `http://localhost:5000/${offer.image}`,
    }));
    

    //------------------ Search ------------------------------------//
    // const handleSearch = async() => {
    //   const query = `title:${searchText} OR type_offre:${searchText} OR duration:${searchText} OR location:${searchText}`;
    //   try {
    //     const response = await fetch(`http://localhost:5000/searchOffers?query=${query}`);
    //     if (response.ok) {
    //       const data = await response.json();
    //       setOffers(data);
    //     } else {
    //       console.log('Error retrieving offers');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const editOffer =  (id)=>{
      history.push(`/admin/editOffer/?id=${id}`);
    }

//---------------------- Pagination ------------------------------------------//
 //   const handlePageChange = (pageNumber) => {
    //    setActivePage(pageNumber);
     // }
    
    //   const paginationItems = [];
    //   for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    //     paginationItems.push(
    //       <PaginationItem
    //         key={pageNumber}
    //         active={pageNumber === activePage}
    //       >
    //         <PaginationLink onClick={() => handlePageChange(pageNumber)}>
    //           {pageNumber}
    //         </PaginationLink>
    //       </PaginationItem>
    //     );
    //   }

      //------------------------------ PDF ------------------------------------------//
      const generatePDF = () => {
         // Créer un nouveau document PDF
    const doc = new jsPDF();
    


    // Définir les en-têtes de colonne pour le tableau
    const headers = [["Title", "Category", "Description", "Availability", "Duration", "Location", "Languages"]];

    // Obtenir les données du tableau
    const data = offers.map(offer => [offer.title, offer.type_offre, offer.description, offer.availability, offer.duration, offer.location, offer.languages]);


    // Ajouter le tableau au document PDF avec la fonction autotable de jsPDF
    doc.autoTable({
      head: headers,
      body: data
    });


    // Sauvegarder le document PDF
    doc.save("offers.pdf");
    }
      
   
      const pageCount = Math.ceil(offers.length / offersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  return (
    <>
   

      <div className="content">

      {/* <div className="search-container">
  <Input
    type="text"
    placeholder="Search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <button onClick={handleSearch}>Search</button>
</div> */}
        <Row>
          <Col md="12">

            <Card>
<br></br>
<br></br>

              <Form onSubmit={handleSearchSubmit}>

              <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText><i className="nc-icon nc-zoom-split"></i></InputGroupText>
        </InputGroupAddon>
        <Input
                          placeholder="search"
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                        />
      </InputGroup>
                       
                        <Button
                        variant= "success"
                        type="submit"
                        >Search</Button>
              </Form>

              <CardHeader>
                <CardTitle tag="h4" style={{fontWeight: "bold"}}>Display All Offers</CardTitle>
              </CardHeader>

         

              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Availability</th>
                      <th>Duration</th>
                      <th>Location</th>
                      <th>Languages</th>


                      <th>Actions</th>

                    </tr>
                  </thead>
                  <tbody>
                  {offers
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .slice(pagesVisited, pagesVisited + offersPerPage)
                  .map((offer) => (
                     <tr key={offer._id} >
                     {/* <td><img src={"../../assets/uploads/offers/"+offer.image} alt="offer image"/></td> */}
                     <td>
                      <img src={ "../../assets/uploads/offers/" +offer.image } alt="offer img"/>
                      </td>

                     <td>{offer.title}</td>
                     <td>{offer.type_offre}</td>
                     <td>{offer.description}</td>
                     <td>{offer.availability}</td>
                     <td>{offer.duration}</td>
                     <td>{offer.location}</td>
                     <td>{offer.languages}</td>

                     <td><Button
                      style={{marginTop: "22px" }}
                      variant="danger"
                      onClick={()=> deleteOffer(offer._id)}
                     >Delete</Button></td>

                     <td>
                      <Button
                       style={{marginTop: "22px" }}
                       variant="secondary"
                       onClick={()=> editOffer(offer._id)}
                      >Edit</Button>
                     </td>

                     
                 </tr>
                  ))}
                  </tbody>
                </Table>
                <br></br>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'pagination'}
                  previousLinkClassName={'previous_page'}
                  nextLinkClassName={'next_page'}
                  disabledClassName={'disabled'}
                  activeClassName={'active'}
                />
                <br></br>
                <Button 
                  variant="success"
                  onClick={generatePDF}>Export to PDF</Button>

               
                
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default ViewOffers;