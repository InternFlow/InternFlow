import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

 function UpdateMaterialForm(props) {

  const { updateMaterial, classId } = props;

  const [material, setMaterial] = useState(props.material);
 
  const uploadFileUrl = 'http://localhost:5000/file/upload';

  const [error, setError] = useState({
    name: '',
    url: '',
  });
  const [activeTab, setActiveTab] = useState('url');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleErrors = () => {
    if (activeTab === 'url') {
      if (!isValidUrl(material.url)) {
        setError((prevState) => ({ ...prevState, url: 'Please enter a valid URL' }));
      } else {
        setError((prevState) => ({ ...prevState, url: '' }));
      }
    }

    if (activeTab === 'file') {
      if (!material.file) {
        setError((prevState) => ({ ...prevState, file: 'Please select a file' }));
      } else {
        setError((prevState) => ({ ...prevState, file: '' }));
      }
    }

    if (material.name.length < 3) {
      setError((prevState) => ({ ...prevState, name: 'Name must be at least 3 characters' }));
    } else {
      setError((prevState) => ({ ...prevState, name: '' }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleErrors();

    if (!(material.name.length < 3)) {
      if (activeTab === 'url' && isValidUrl(material.url)) {
        updateMaterial(material, classId);
        setMaterial({ id: '', name: '', url: '' });
      }

      if (activeTab === 'file' && material.file) {
        const formData = new FormData();
        formData.append('file', material.file);
        const response = await fetch(uploadFileUrl, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        updateMaterial({ ...material, url: data.fileUrl }, classId);
        setMaterial({ id: '', name: '', file: '' });
      }
    }
  };

  const handleFileChange = (e) => {
    setMaterial((prevState) => ({ ...prevState, file: e.target.files[0] }));
  }

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

      

      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'url' ? 'active' : ''}
            onClick={() => { toggleTab('url'); }}
          >
            URL
          </NavLink>
          </NavItem>
          <NavItem>
  <NavLink
    className={activeTab === 'file' ? 'active' : ''}
    onClick={() => { toggleTab('file'); }}
  >
    File
  </NavLink>
</NavItem>

</Nav>
<TabContent activeTab={activeTab}>
<TabPane tabId="url">
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
</TabPane>
<TabPane tabId="file">
  <FormGroup>
    <Label for="file">File</Label>
    <Input
      type="file"
      name="file"
      id="file"
      onChange={handleFileChange}
    />
    {error.file !== '' && (
      <Alert color="danger">
        {error.file}
      </Alert>
    )}
  </FormGroup>
</TabPane>
</TabContent>
      <Button onClick={handleSubmit} color="primary">
        Update Material
      </Button>
    </Form>
  );
};

export default UpdateMaterialForm;
