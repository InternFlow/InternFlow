import { Input } from 'reactstrap';

function SearchBar({ handleSearch }) {
  return (
    <Input type="text" placeholder="Search" onChange={(event) => handleSearch(event.target.value)} />
  );
}
