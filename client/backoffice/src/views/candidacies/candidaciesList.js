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
  Input,InputGroup,InputGroupText,InputGroupAddon
} from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CandidaciesList() {
    const [users, setUsers] = useState([]);
    const [candidacies, setCandidacies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const history = useHistory();
    const role = localStorage.getItem("role");
    const [searchTerm, setSearchTerm] = useState("");
console.log(candidacies);

    const showCondidacy = (idI,idO) => {

      console.log(idI);
      console.log(idO);
      history.push(`/showApply?param=${idI}&param2=${idO}`);
  
    }



    async function getCondidies(){

        fetch(`http://localhost:5000/Admin/allCandidacies`, {
          credentials: 'include'
        })
      .then((response) => response.json())
      .then((data) => setCandidacies(data));
    }
    useEffect(()=>{getCondidies()},[])

    const deleteUser = async (id) => {
      const result = window.confirm("Are you sure you want to delete?");
      await axios.delete(`http://localhost:5000/Admin/deleteU/${id}`, {
        withCredentials: true
      })
      .then((res) => {
        history.push("/admin/viewUser");
      });
      getCondidies();

    }


    const editUser =  (id)=>{
      history.push(`/Admin/editUser/?id=${id}`);
    }

    const editProfileCondidat =  async(id)=>{
try{
      console.log(id)

      const response = await fetch(`${API}/Condidat/getUser/${id}`,{
        credentials: 'include'
      }
);

      const data = await response.json();

      console.log(data.role  )
      if (data.role !== 'condidat' ) {
        console.log('Vous n\'êtes pas candidat');
      }else{
        history.push(`/Admin/editProfileCondidat/?id=${id}`);

      }
    }
      catch (error){
        console.log("error getting user.",error)
      }

          }


    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" style={{fontWeight: "bold"}}>Display All Candidacies</CardTitle>
                
<Input
  placeholder="Search By Status..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="col-md-3">Intern</th>
                      <th className="col-md-2">Offre Title</th>
                      <th className="col-md-2">Date</th>
                      <th className="col-md-2">Status</th>
                      <th className="col-md-5">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(candidacies) &&
  candidacies
    .filter(
      (candidacy) =>
        candidacy.status
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .map((Candidacy) => (  <tr key={Candidacy._id}>
    <td className="col-md-3">{Candidacy.intern.name}</td>
    <td className="col-md-2">{Candidacy.offer.title}</td>
    <td className="col-md-2">{new Date(Candidacy.dateApply).toLocaleDateString()}</td>
    <td className="col-md-2">{Candidacy.status}</td>
    <td>
      <Button
        style={{marginTop: "22px"}}
        variant="danger"
        onClick={() => deleteUser(Candidacy._id)}
      >
        Delete
      </Button>
      <Button
        style={{marginTop: "22px"}}
        variant="secondary"
        onClick={() => editUser(Candidacy._id)}
      >
        Offer
      </Button>
      <Button
        style={{marginTop: "22px"}}
        variant="secondary"
        onClick={() => showCondidacy(Candidacy.intern._id, Candidacy.offer._id)}
      >
        Candidacy
      </Button>
    </td>
  </tr>
))}

 </tbody>
                </Table>
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
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default CandidaciesList;
