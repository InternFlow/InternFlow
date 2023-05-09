import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

function DynamicSearch() {
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);


const handleChange = event => {
setSearchTerm(event.target.value);
};

const handleSubmit = event => {
event.preventDefault();
fetch(`${API}/Offer/search?query=${searchTerm}`)
.then(res => res.json())
.then(data => setSearchResults(data.results))
.catch(err => console.log(err));
};

return(
    <div>
        <form onSubmit={handleSubmit}>
<FormGroup>
<Label for="search">Recherche:</Label>
<Input
         type="text"
         name="search"
         id="search"
         placeholder="Entrez votre recherche"
         value={searchTerm}
         onChange={handleChange}
       />
</FormGroup>
<button type="submit">Rechercher</button>
</form>
    </div>
)

}