import React, { useState } from 'react'
import MyClass from './MyClass'
import { BsPlusCircle } from 'react-icons/bs';
import { Modal, ModalBody, ModalHeader, Tooltip } from 'reactstrap';
import AddClassForm from './AddClassForm';
import UpdateClassForm from './UpdateClassForm';
import UpdateMaterialForm from './UpdateMaterialForm';
import AddMaterialForm from './AddMaterialForm';
export default function MyClasses(props) {
    const classes = props.course.classes;
    const {onChange}= props;
    const [addClassModal, setAddClassModal] = useState(false)
    const [editClassModal, setEditClassModal] = useState(false)
    const [addMaterialModal, setAddMaterialModal] = useState(false)
    const [editMaterialModal, setEditMaterialModal] = useState(false)
    const [updatedClass, setUpdatedClass] = useState();
    const [updatedMaterial, setUpdatedMaterial] = useState();
    const [currentClassId,setCurrentClassId]= useState();
   

    const handleEditClass = (classitem)=> {
      setUpdatedClass(classitem);
      setEditClassModal(true)
    }

    const handleAddClass = ()=>{
        setAddClassModal(true);
    }


    const updateClass = async ( classData) => {
      const courseId = props.course._id;
      const classId = classData._id;
      try {
        await fetch(`http://localhost:5000/course/${courseId}/classes/${classId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(classData)
        });
    
        onChange();
        setEditClassModal(!editClassModal);
      } catch (err) {
        console.error(err);
      }
      
    };
    

    const deleteClass = async (classData) =>{
      const courseId = props.course._id;
      const classId = classData._id;
      fetch(`http://localhost:5000/course/${courseId}/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        onChange();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
      
    }
  
    const addMaterial = async (materialData,classId)=>{

      const courseId = props.course._id;
      fetch(`http://localhost:5000/course/${courseId}/classes/${classId}/material`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(materialData)
})
  .then((response) => {
    setAddMaterialModal(false);
    onChange();
  })
  .catch(error => {
    // Handle error
  });

}

  const addClass = async (classData)=>{
    
  await    fetch(`http://localhost:5000/course/${props.course._id}/classes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(classData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add class');
    }
    return response.json();
  })
  .then(data => {
    onChange();
    setAddClassModal(false);
  })
  .catch(error => {
    console.error(error);
    // Handle error
  });
    }

    const handleEditMaterial = (material,classId)=>{
      
      setUpdatedMaterial({...material});
      setCurrentClassId(classId);
        setEditMaterialModal(true);
    }

    const handleDeleteMaterial = (material,classId)=>{
      fetch(`http://localhost:5000/course/${props.course._id}/classes/${classId}/material/${material._id}`, {
  method: 'DELETE',
  credentials: 'include'
})
  .then(response => {
    onChange();
  })
  .catch(error => {
    // Handle error
  });

    }

    const handleAddMaterial = (classId)=>{
      setCurrentClassId(classId);
        setAddMaterialModal(true);
    }

    const updateMaterial = async (material,classId)=>{
        await fetch(`http://localhost:5000/course/${props.course._id}/classes/${classId}/material/${material._id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(material)
        })
          .then(response => {
            onChange();
            setEditMaterialModal(false);
          })
          .catch(error => {
            // Handle error
          });
        
    }
    
  return (
    <div>
      {classes.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
      .map((item) => (
        <MyClass class={item} 
        onDeleteClass={deleteClass} 
        onEditClass={handleEditClass} 
        onEditMaterial={handleEditMaterial}
        onDeleteMaterial={handleDeleteMaterial}
        onAddMaterial={handleAddMaterial}
        key={item._id}/>
        
      ))}
      <div style={{margin: "50px"}} ><BsPlusCircle color="gray" onClick={handleAddClass} 
      style={{ cursor:"pointer",fontSize:"80"}}>
        </BsPlusCircle></div>


      <Modal isOpen={addClassModal} toggle={()=>setAddClassModal(!addClassModal)}>
        <ModalHeader>Create Class</ModalHeader>
        <ModalBody>
        <AddClassForm onAddClass={addClass}></AddClassForm>
        </ModalBody>
      </Modal> 

      <Modal  isOpen={editClassModal} toggle={()=>setEditClassModal(!editClassModal)}>
        <ModalHeader>Edit Class Details</ModalHeader>
        <ModalBody>
        <UpdateClassForm onUpdateClass={updateClass} class={updatedClass} ></UpdateClassForm>
        </ModalBody>
      </Modal>

      <Modal isOpen={addMaterialModal} toggle={()=>setAddMaterialModal(!addMaterialModal)}>
        <ModalHeader>Add New Material</ModalHeader>
        <ModalBody>
        <AddMaterialForm addMaterial={addMaterial} classId={currentClassId}></AddMaterialForm>
        </ModalBody>
      </Modal >

      <Modal  isOpen={editMaterialModal} toggle={()=>setEditMaterialModal(!editMaterialModal)}>
        <ModalHeader>Edit Material</ModalHeader>
        <ModalBody>
        <UpdateMaterialForm updateMaterial={updateMaterial} material={updatedMaterial} 
        classId={currentClassId}
        ></UpdateMaterialForm>
        </ModalBody>
      </Modal >

    

   

      
    </div>
  )
}
