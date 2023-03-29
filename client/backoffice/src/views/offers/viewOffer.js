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
  PaginationLink
} from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ViewOffers() {
    const [offers, setOffers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = 20;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const [pageNumber, setPageNumber] = useState(0);
    // const offersPerPage = 5;
    // const pagesVisited = pageNumber * offersPerPage;
    const history = useHistory();


    async function getUsers(){

        fetch(`${API}/Offer/getOffers`, {
          credentials: 'include'
        })
      .then((response) => response.json())
      .then((data) => setOffers(data));
    }
    useEffect(()=>{getUsers()},[])

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

    const editOffer =  (id)=>{
      history.push(`/Offer/EditOffer/?id=${id}`);
    }


    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      }
    
      const paginationItems = [];
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        paginationItems.push(
          <PaginationItem
            key={pageNumber}
            active={pageNumber === activePage}
          >
            <PaginationLink onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      }

   

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" style={{fontWeight: "bold"}}>Display All Offers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
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
                //   .slice(pagesVisited, pagesVisited + offersPerPage)
                  .map((offer) => (
                     <tr key={offer._id} >
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
                  <Pagination>
                    <PaginationItem disabled={activePage === 1}>
                     <PaginationLink onClick={() => handlePageChange(activePage - 1)} previous />
                    </PaginationItem>
                        {paginationItems}
                    <PaginationItem disabled={activePage === totalPages}>
                        <PaginationLink onClick={() => handlePageChange(activePage + 1)} next />
                    </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default ViewOffers;
