import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "../../Pictures/logo1.png";
import axios from "axios";

import "./Footer.css";

function Footer() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	}
	const handleSendEmail = async () => {
		if (!email) {
			return alert("กรอก Email ของคุณ")
		} if (!message) {
			return alert("กรอกปัญหาของคุณ")
		}
		try {
			axios.post(`${process.env.REACT_APP_API}/send-email`, {
				email, message
			});
			alert("ส่ง Email สําเร็จ");
			setEmail("")
			setMessage("")
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Container className="footerFrameModi border-top p-4" fluid >
			<Container className="footerModi">
				<Row></Row>
				<Row >
					<Col xxl={3} xl={3} lg={4} md={4} sm={4} xs={12} className=" text-center">
						<div className="p-3">
							<img src={Logo} alt="Logo" className="img-fluid bg-black"
								width="100px" />
						</div>
					</Col>
					<Col xxl={3} xl={3} lg={4} md={4} sm={4} xs={6} className="pb-3">
						<div className="contactUsHeader">เพิ่มเติม</div>
						<Stack>
							<div>เกี่ยวกับเรา</div>
							<div>นโยบายความเป็นส่วนตัว</div>
							<div>ข้อกำหนดและเงื่อนไข</div>
						</Stack>
					</Col>
					<Col xxl={3} xl={3} lg={4} md={4} sm={4} xs={6} className="pb-3">
						<div className="contactUsHeader">ช่องทางการติดต่อ</div>
						<Row className="d-flex">
							<Col xs={2} className="text-start">
							<div>Email</div>
							</Col>
							<Col xs={10} className="text-start">
							<div>: tsfy.project@gmail.com</div>
							</Col>
							
						</Row>
						<Row className="d-flex">
							<Col xs={2} className="text-start">
							<div>Line</div>
							</Col>
							<Col xs={10} className="text-start">
							<div>: @TSFY</div>
							</Col>
							
						</Row>
						<Row className="d-flex">
							<Col xs={2} className="text-start">
							<div>IG</div>
							</Col>
							<Col xs={10} className="text-start">
							<div>: TSFY</div>
							</Col>
							
						</Row>
					</Col>
					<Col xxl={3} xl={3} lg={12} md={12} sm={12} xs={12} className="pb-3">
						<Container className="contactUsModi">
							<div className="contactUsHeader mb-1">แจ้งปัญหาการใช้งาน</div>
							<Container>
								<Row>
									<Form>
										<Form.Group className="my-3" controlId="formBasicEmail">
											<Form.Control type="email" placeholder="ใส่อีเมลล์ของคุณ" onChange={handleEmailChange} />
										</Form.Group>
										<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
											<Form.Control as="textarea" placeholder="กรอกปัญหาของคุณ" onChange={handleMessageChange} rows={3} />
										</Form.Group>
										<div className="d-flex">
										<Button variant="primary" type="submit" className="btn mx-auto w-100" onClick={handleSendEmail}>
											ส่งปัญหา
										</Button>
										</div>
										
									</Form>
								</Row>
							</Container>
						</Container>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default Footer;
