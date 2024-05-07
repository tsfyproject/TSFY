import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarC from 'react-bootstrap/Navbar';
import "./Navbar.css";
import Logo from "../../Pictures/logo2.png";
import Image from "react-bootstrap/Image";

function Navbar() {
    return (
      <NavbarC expand="lg" sticky='top' className='navBackground'>
        <Container>
          <NavbarC.Brand href="/" className="logoFrame">
            <Image src={Logo} className="logoModi" />
          </NavbarC.Brand>
          <NavbarC.Toggle aria-controls="basic-navbar-nav" />
          <NavbarC.Collapse id="basic-navbar-nav" className='navFontColor ms-5'>
            <Nav className="me-auto gap-lg-5 gap-xxl-5 gap-xl-5">
              <Nav.Link href="/">
                <div className='navFontColor'>หน้าหลัก</div>
              </Nav.Link>
              {/* <Nav.Link href="placelist">
                <div className='navFontColor'>สถานที่ท่องเที่ยว</div>
              </Nav.Link> */}
            </Nav>
          </NavbarC.Collapse>
        </Container>
      </NavbarC>
    );
  }
  
  export default Navbar;

