import ProfilePageHeader from 'components/Headers/ProfilePageHeader'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar'
import CourseList from 'components/TrainerComponents/CourseList'
import React, { useEffect, useState } from 'react'

export default function CondidatCourses() {
    const [courses, setCourses] = useState(null)

    const fetchCourses = async ()=> {
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
                ,credentials: 'include'
              };
          const response = await fetch('http://localhost:5000/course/MyCourses/get',requestOptions);
          const data = await response.json();
          setCourses(data.courses);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        fetchCourses();
      }, []);

  return (
    <div>
        <ExamplesNavbar />
        <ProfilePageHeader />
        {courses &&(<CourseList courses={courses} />)}
    </div>
  )
}
