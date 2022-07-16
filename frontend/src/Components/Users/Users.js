import NavBar from "../Navbar/Navbar";
import {useState,useEffect} from 'react';
import { Button, Pagination, Table,Form} from "react-bootstrap";
import UserPage from './UserPage';
import axios from 'axios';

function Users(){
    const [users,setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch] = useState('');
    const [sort,setSort] = useState('');
    const [showSearch,setShowSearch] = useState(search===''?false:true);
    const [searchResult,setSearchResult] = useState({});
    const [isAscending,setSortAscending] = useState(false);
    const [paginatedUsers,setPaginatedUsers] = useState([]);
    useEffect(() => {
        axios.get("https://user-portfolio-management.herokuapp.com/users")
            .then((res) => setUsers(res.data.users))
            .catch((err) => console.log(`Error: ${err}`));
    },[]);
    useEffect(() => {
        const start = currentPage*5 - 5;
        const end = start+5;
        const slicedUsers = users;
        setPaginatedUsers(slicedUsers.slice(start,end));
    },[currentPage,users]);
    const changePage = (e) => {
        setCurrentPage(Number(e.target.textContent));
        console.log(e.target.textContent);
        setShowSearch(false);
    }
    let active = 1;
    let items = [];
    for (let number = 1; number <= users.length/5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={changePage}>
        {number}
        </Pagination.Item>,
    );
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const goToPrevPage = () => {
        if(currentPage === 1){
            return;
        }
        else{
            setCurrentPage(page => --page);
            setShowSearch(false);
        }
    }
    const goToNextPage = () => {
        if(currentPage === Math.round(users.length/5) && Math.round(users.length) < (5*currentPage)){
            console.log(currentPage);
            return;
        }
        else{
            setCurrentPage(page => ++page);
            setShowSearch(false);
        }
    }
    const displayUser = () => {
        if(showSearch){
            return (
                searchResult.map(result => <UserPage data={result}/>)
            )
        }
        return paginatedUsers.map((user) => (
                <UserPage data={user}/>));
    }
    const getSearchResult = (e) => {
        e.preventDefault();
        if(search !== ''){
            let searchedUser = users.filter(user => {
                if(user.first_name === search || user.last_name === search){
                    return user;
                }
            });
            setSearchResult(searchedUser);
            setShowSearch(true);
        }
        else{
            setSearch(''); 
        }
    }
    const handleSort = (e) => {
        let key = sort;
        if(isAscending){
            paginatedUsers.sort((a,b) => a[key] > b[key]?1:-1)
            setSortAscending(false);
        }
        else{
            paginatedUsers.sort((a,b) => a[key] > b[key]?-1:1)
            setSortAscending(true);
        }
    }
    return (
        <div>
            <NavBar page="Users"/>
                <div className="card mx-3 my-0">
                    <div className="mb-2">
                        <h2 className="ms-3 mt-3 float-start">User Details</h2>
                        <div className='m-3 d-inline-block float-end'>
                            <Form>
                            <Form.Group className="d-flex justify-content-between">
                                <Form.Label column sm="2" className='text-start'>Sort By</Form.Label>
                                <Form.Select className="me-1" onChange={(e) => setSort(e.target.value)}>
                                    <option value="_id">Id</option>
                                    <option value="first_name">First Name</option>
                                    <option value="last_name">Last Name</option>
                                    <option value="company_name">Company Name</option>
                                    <option value="city">City</option>
                                    <option value="state">State</option>
                                    <option value="zip">Zipcode</option>
                                    <option value="email">Email</option>
                                    <option value="web">Web</option>
                                    <option value="age">Age</option>
                                </Form.Select>
                                <Button className="mx-2" variant="dark" onClick={handleSort}>Sort</Button>
                                <Form.Control type="text" name='search' placeholder="Search" value={search} onChange={handleSearch}/>
                                <Button className="ms-2" variant="dark" onClick={getSearchResult}>Search</Button>
                            </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <Table striped responsive="xl" size="sm" variant="light" bordered className="mb-0">
                        <thead>
                            <tr>
                                <th id="_id">Id<i className="bi bi-sort-up"></i></th>
                                <th id="first_name">First Name</th>
                                <th id="last_name">Last Name</th>
                                <th id="company_name">Company Name</th>
                                <th id="city">City</th>
                                <th id="state">State</th>
                                <th id="zip">ZipCode</th>
                                <th id="email">Email</th>
                                <th id="web">Web</th>
                                <th id="age">Age</th>
                            </tr>
                        </thead> 
                        <tbody>           
                            {displayUser()}
                        </tbody>
                    </Table>
                </div>
                <Pagination size="sm" className="me-3 mb-3 float-end">
                        <Pagination.Prev onClick={goToPrevPage}/>
                        {items}
                        <Pagination.Next onClick={goToNextPage}/>
                </Pagination>
        </div>
    )
}
export default Users;
