

// import React, { useState, useEffect, useRef } from "react";
// import { Chart } from 'chart.js';
// import { useHistory } from "react-router-dom";
// import CondidatNavbar from "components/Navbars/CondidatNavbar.js";
// import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
// import DemoFooter from "components/Footers/DemoFooter.js";
// import { Container } from "reactstrap";
// import axios from "axios";
// import { API } from "config";

// function CandidateStats() {
//   const id = localStorage.getItem("id");



//   const history = useHistory();

//   return (
//     <>
//       <CondidatNavbar />
//       <ProfilePageHeader />
//       <div className="section profile-content">
//         <br></br>
//         <Container>
//           <div className="owner">
//             <p>Skills pour chaque entreprise</p>
//           </div>
//         </Container>
//       </div>
//       <DemoFooter />
//     </>
//   );
// }
//   // Données statiques pour chaque entreprise
//   const companiesData = [
//     {
//       name: "Entreprise A",
//       skills: [
//         { name: "Compétence 1", percentage: 50 },
//         { name: "Compétence 2", percentage: 30 },
//         { name: "Compétence 3", percentage: 20 },
//       ]
//     },
//     {
//       name: "Entreprise B",
//       skills: [
//         { name: "Compétence 4", percentage: 70 },
//         { name: "Compétence 5", percentage: 20 },
//         { name: "Compétence 6", percentage: 10 },
//       ]
//     }
//   ];

//   // Création des graphiques pour chaque entreprise
//   const createCharts = () => {
//     companiesData.forEach((company) => {
//       const ctx = document.getElementById(`chart-${company.name}`);
//       new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: company.skills.map(skill => skill.name),
//           datasets: [{
//             data: company.skills.map(skill => skill.percentage),
//             backgroundColor: [
//               '#FF6384',
//               '#36A2EB',
//               '#FFCE56',
//               '#4BC0C0',
//               '#9966FF',
//               '#FF9F40'
//             ],
//             hoverBackgroundColor: [
//               '#FF6384',
//               '#36A2EB',
//               '#FFCE56',
//               '#4BC0C0',
//               '#9966FF',
//               '#FF9F40'
//             ]
//           }]
//         },
//         options: {
//           responsive: true,
//         //   maintainAspectRatio: false,
//         aspectRatio: 3, // définir la valeur souhaitée pour l'aspect ratio


//         },
//       });
//     });
//   };

//   React.useEffect(() => {
//     createCharts();
//   }, []);


  
// export default CandidateStats;

import React, { useState } from "react";
import { Chart, ArcElement } from 'chart.js';
import { Container } from "reactstrap";
import {
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, PieController,
  } from 'chart.js';
import DemoFooter from "components/Footers/DemoFooter";
import CondidatNavbar from "components/Navbars/CompanyNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import { API } from "../../config/index";
import axios from "axios";
  
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, PieController, ArcElement
  );


function CandidateStats() {



const [companySkills, setCompanySkills] = useState([]);
const companiesData = [];

const createCharts = (companiesData) => {
    companiesData.forEach((company) => {
      const ctx = document.getElementById(`chart-${company.name}`);
      console.log(company.name);
      console.log(ctx);

      if (ctx) { // check if canvas element exists
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: company.skills.map(skill => skill.name),
            datasets: [{
              data: company.skills.map(skill => skill.percentage),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }]
          },
          options: {
            responsive: true,
            aspectRatio: 3,
          },
        });
      }
    });
  };

  React.useEffect(() => {
    axios.get(`${API}/Offer/company-skills`)
      .then(response => {
        const { companySkills } = response.data;
        console.log(response.data);
        const companiesData = [];
        for (const [name, skills] of Object.entries(companySkills)) {
          companiesData.push({
            name,
            skills: skills.map(skill => ({
              name: skill.name,
              percentage: skill.percentage
            }))
          });
          console.log(name);
        }
        setCompanySkills(companiesData);
        console.log(companiesData);
        createCharts(companiesData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  
  
  
  

React.useEffect(() => {
  createCharts(companySkills);
}, [companySkills]);

  return (
    <>
     <CondidatNavbar />
      <ProfilePageHeader />
      <div className="section profile-content" >
        <br></br>
      <Container>
      <div className="owner">

      {companiesData.map((company) => (
        <div key={company.name}>
          <h3>{company.name}</h3>
          <canvas id={`chart-${company.name}`} width={10} height={10}> </canvas>

        </div>
      ))}
      </div>
      </Container>
    </div>
      <DemoFooter />

    </>
  );
}

export default CandidateStats;



