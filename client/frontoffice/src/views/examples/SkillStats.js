import axios from 'axios';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import SkillStatsHeader from 'components/Headers/SkillStatsHeader';
import CondidatNavbar from 'components/Navbars/CompanyNavbar';
import { data } from 'jquery';
import React, { useState, useEffect } from 'react'
import {Bar, Doughnut, Pie} from 'react-chartjs-2'
import { Container } from 'reactstrap';

function SkillStats() {
    const [companySkills, setCompanySkills] = useState([]);

  //------------------------- STATS OK! --------------------------------//
    // useEffect(() => {
    //     async function fetchCompanySkills() {
    //       const response = await fetch("http://localhost:5000/Offer/company-skills");
    //       const data = await response.json();
    //       setCompanySkills(data.companySkills);
    //     }
    //     fetchCompanySkills();
    //   }, []);
    
    //   const chartData = {
    //     labels: Object.keys(companySkills),
    //     datasets: Object.keys(companySkills).map((companyName, index) => {
    //       const skills = companySkills[companyName];
    //     //   const backgroundColor = `rgba(${index * 50}, ${index * 50}, ${index * 50}, 0.5)`;
    //     const backgroundColors = [
    //         'rgba(255, 99, 132, 0.5)',
    //         'rgba(54, 162, 235, 0.5)',
    //         'rgba(255, 206, 86, 0.5)',
    //         'rgba(75, 192, 192, 0.5)',
    //         'rgba(153, 102, 255, 0.5)',
    //         'rgba(255, 159, 64, 0.5)',
    //       ];
    //       const backgroundColor = backgroundColors[index % backgroundColors.length];
    //       return {
    //         label: companyName,
    //         data: skills.map((skill) => skill.score),
    //         backgroundColor,
    //         borderColor: backgroundColor,
    //         borderWidth: 1,
    //       };
    //     }),
    //   };

    //   const chartOptions = {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   };

    //---------------------------- End Stats OK! --------------------------------------------//
    useEffect(() => {
        async function fetchCompanySkills() {
          const response = await fetch("http://localhost:5000/Offer/company-skills");
          const data = await response.json();
          setCompanySkills(data.companySkills);
        }
        fetchCompanySkills();
      }, []);
      
      const chartData = {
        // labels: Object.values(companySkills)[0].map((skill) => skill.name),
        labels: companySkills && Object.values(companySkills)[0] ? Object.values(companySkills)[0].map((skill) => skill.name) : [],

        datasets: Object.keys(companySkills).map((companyName, index) => {
          const skills = companySkills[companyName];
        //   console.log();

          const backgroundColors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ];
          const backgroundColor = backgroundColors[index % backgroundColors.length];
          return {
            label: companyName,
            data: skills.map((skill) => skill.percentage),
            backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1,
          };

        }),
      };
      
      const chartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Company',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Skills',
              },
            },
          ],
        },
      };
      
  return (
    <>
    <CondidatNavbar />
    <SkillStatsHeader />
    <div className="section profile-content" >
        <br></br>
        <Container>
            <center>
            <h3 style={{ fontWeight: 'bold', color: 'blueviolet'}}>The most demanded skills of each company</h3>
            <br></br>
            <br></br>
            <br></br>

          <div className="owner" style={{ height: "600px", width: "800px" }}>
          <Bar data={chartData} options={chartOptions} />

          </div>
          </center>

        </Container>
    </div>
    </>
  )
}

export default SkillStats