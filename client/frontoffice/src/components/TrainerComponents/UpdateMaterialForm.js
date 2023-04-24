import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

 function UpdateMaterialForm(props) {

  const { updateMaterial, classId } = props;

  const [material, setMaterial] = useState(props.material);
  const [error, setError] = useState({
    name: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleErrors = ()=>{

    if (!isValidUrl(material.url)) {
        setError((prevState) => ({ ...prevState, url: 'Please enter a valid URL' }));
      } else {
        setError((prevState) => ({ ...prevState, url: '' }));
      }
  
      if (material.name.length < 3) {
        setError((prevState) => ({ ...prevState, name: 'Name must be at least 3 characters' }));
      } else {
        setError((prevState) => ({ ...prevState, name: '' }));
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleErrors();

    if (!(material.name.length < 3) && isValidUrl(material.url)) {
      updateMaterial(material,classId);
      setMaterial({ id: '', name: '', url: '' });
    }
  };

    function isValidUrl(string) {
        try {
          new URL(string);
          return true;
        } catch (err) {
          return false;
        }
      }

  return (
    <Form >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={material.name}
          onChange={handleChange}
        />
        {error.name !== '' && (
          <Alert color="danger">
            {error.name}
          </Alert>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="url">URL</Label>
        <Input
          type="text"
          name="url"
          id="url"
          placeholder="URL"
          value={material.url}
          onChange={handleChange}
        />
        {error.url !== '' && (
          <Alert color="danger">
            {error.url}
          </Alert>
        )}
      </FormGroup>

      <Button  color="primary" onClick={handleSubmit}>
        Edit Material
      </Button>
    </Form>
  );
};

export default UpdateMaterialForm;
