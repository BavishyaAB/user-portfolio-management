import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import NavBar from "../Navbar/Navbar";
import {Button, Stack} from 'react-bootstrap';
import axios from 'axios';

function UserDetail(){
    let {userId} = useParams();
    const [userProfile,setUserProfile] = useState([]);
    useEffect(() => {
        axios.get(`https://user-portfolio-management.herokuapp.com/users/${userId}`)
            .then((res) => setUserProfile(res.data.user))
            .catch((err) => console.log(`Error: ${err}`));
    },[userId])
    const handleEdit = (e) => {
        let updateKey = e.target.parentElement.id;
        let updateValue = prompt(`Update ${updateKey}?`,'');
        let updatedUser = userProfile;
        if(updateValue !== ''){
            updatedUser[updateKey] = updateValue;
        }
        axios.put(`https://user-portfolio-management.herokuapp.com/users/${userId}`,updatedUser)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(`Error: ${err}`));
    }
    const showUserDetail = ()=>{
        return (
            <div className='m-2' id={userProfile._id}>
                <Stack gap={1} className="w-100">
                    <div id="first_name" className='m-1 p-3 card d-flex flex-row align-items-center justify-content-between'>
                            <div>First Name</div>
                            <div>{userProfile.first_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="last_name" className='m-1 p-3 card d-flex flex-row align-items-center justify-content-between'>
                        <div>Last Name</div>
                        <div>{userProfile.last_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="company_name" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>CompanyName</div>
                        <div>{userProfile.company_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="city" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>City</div>
                        <div>{userProfile.city}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="state" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>State</div>
                        <div>{userProfile.state}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="zip" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >ZipCode</div>
                        <div >{userProfile.zip}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="email" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >Email Address</div>
                        <div >{userProfile.email}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="email" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >Password</div>
                        <div >{userProfile.password}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="web" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >Website</div>
                        <div >{userProfile.web}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="age" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>Age</div>
                        <div>{userProfile.age}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>   
                </Stack>
            </div>
        )
    }
    return (
        <div>
            <NavBar page="UserDetail"/>
                 <div className='m-5'>
                     {showUserDetail()}
                </div>
        </div>
    )
}

export default UserDetail;