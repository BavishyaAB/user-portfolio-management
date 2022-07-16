import {Container, Nav,Navbar} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
function NavBar(props){
    let navigate = useNavigate();
    const page = props.page;
    const [reg,setReg] = useState(true);
    const [login,setLogin] = useState(false);
    const handleNavSelect = (eventKey) => {
        console.log(eventKey);
        switch(eventKey){
            case "register": 
                if(reg){
                    setReg(false);
                }
                else{
                    setReg(true);
                    setLogin(false);
                };
            break;
            case "login":
                if(login){
                    setLogin(false);
                }
                else{
                    setLogin(true);
                    setReg(false);
                };
            break;
            case "user": navigate('/Users');
            break;
            case "home": navigate('/');
            break;
            case "logout": navigate('/');
            break;
            default: break;
        }
    }
    return(
        <div>
            {page === "Home"?
            <div className='mb-4'>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand>User Management</Navbar.Brand>
                    <Nav onSelect={handleNavSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="register">Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user">View Users</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            {reg && <Register/>}
            {login && <Login/>}
            </div>:page === "Users"?<div className='mb-4'>
            <Navbar bg="dark" variant="dark">
                <Container className='w-100'>
                    <Navbar.Brand>User Management</Navbar.Brand>
                    <Nav onSelect={handleNavSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="home">Home</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            </div>:
            <div className='mb-4'>
            <Navbar bg="dark" variant="dark">
                <Container className='w-100'>
                    <Navbar.Brand>User Management</Navbar.Brand>
                    <Nav onSelect={handleNavSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="logout">Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            </div>
            }
        </div>
    )
}

export default NavBar;