import ProfilePageHeader from 'components/Headers/ProfilePageHeader'
import CondidatNavbar from 'components/Navbars/CondidatNavbar'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import CourseList from 'components/TrainerComponents/CourseList'
import React, { useEffect, useState } from 'react'

export default function AllCourses() {
    const [courses, setCourses] = useState(null)

    const fetchCourses = async ()=> {
        try {
          const response = await fetch('http://localhost:5000/course');
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        fetchCourses();
      }, []);

  return (
    <div>
<CondidatNavbar></CondidatNavbar>
        <ProfilePageHeader />
        {courses &&(<CourseList courses={courses} />)}
    </div>
  )
}
