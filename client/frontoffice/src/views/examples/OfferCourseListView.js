import ProfilePageHeader from 'components/Headers/ProfilePageHeader'
import CondidatNavbar from 'components/Navbars/CondidatNavbar'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import CourseList from 'components/TrainerComponents/CourseList'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function OfferCourseListView() {
    const [courses, setCourses] = useState([])
    const [offer,setOffer]= useState()
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const offerId = searchParams.get("ido");
console.log("ido")



  
  
  const fetchOffer = async ()=> {
    try {
      const response = await fetch('http://localhost:5000/Offer/displayOffer/'+offerId);
      const data = await response.json();
      setOffer(data);
    } catch (error) {
      console.error(error);
    }
  }




    const fetchCourses = async ()=> {
        try {
          const response = await fetch('http://localhost:5000/course');
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error(error);
        }
      }




      const FilteredCourses = courses.filter((course)=>{
        return course.tags.some(tag => offer.skills.includes(tag))
        ;

      }).sort((a, b) => {
        const countA = a.tags.filter(tag => offer.skills.includes(tag)).length;
        const countB = b.tags.filter(tag => offer.skills.includes(tag)).length;
        return countB - countA;
    })

    useEffect(() => {
        fetchCourses();
        fetchOffer();
        console.log(JSON.stringify(FilteredCourses))
      }, []);

  return (
    <div>
<CondidatNavbar></CondidatNavbar>
        <ProfilePageHeader />
        {FilteredCourses &&(<CourseList courses={FilteredCourses} />)}
    </div>
  )
}