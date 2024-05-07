import React, { useContext, useEffect, useState } from "react";
import "./Detail.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import res3 from "../../Pictures/Res/3.png";
import Sample from "../../Pictures/Sample.png";
import Stack from "react-bootstrap/esm/Stack";

import axios from "axios";

export default function Detail() {
	const url = window.location.pathname;
	const parts = url.split("/");
	const blogId = parts[parts.length - 1];

	const [data, setData] = useState("");

	const fetchSingleBlog = async () => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API}/get-single-blog/${blogId}`
			);
			setData(res.data);
			console.log(res.data);
		} catch (error) {
			console.error("Error fetching single blog:", error);
		}
	};
	useEffect(() => {
		fetchSingleBlog();
	}, []);

	return (
		<div className="backgroundColor">
			<Navbar />
			<Container className="detailBackground">
				<Container className="detailHeroSection">
					<Row>
						<Image src={data.blogThumbnail} className="imgModi"></Image>
					</Row>
				</Container>
				<Container className="detailDescSection">
					<Row>
						<h1 className="detailHeaderText">{data.blogTitle}</h1>
					</Row>
					<Row>
						<Container className="detailFrame">
							<h1 className="detailHeader">รายละเอียด</h1>
							<p>{data.blogDesc}</p>
						</Container>
					</Row>
				</Container>
				<Container className="detailLocSection">
					<Row>
						<Container className="detailFrame">
							<h1 className="detailHeader">ที่ตั้ง</h1>
							<p>{data.blogAddress}</p>
						</Container>
					</Row>
					<Row>
						<Container className="detailFrame">
							<iframe
								className="imgMap"
								src={data.blogLocation}
								width="100%"
								height="400"
								allowfullscreen=""
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							></iframe>
						</Container>
					</Row>
				</Container>
				<Container className="detailCreditSection">
					<Row>
						<Container className="detailFrame">
							<h1 className="detailHeader">ขอบคุณแหล่งข้อมูลจาก {data.ytbId?.ytbName}</h1>
						</Container>
					</Row>
					<Row>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
							<Container>
								<iframe
									width="100%"
									height="350"
									src={`https://www.youtube.com/embed/${data.blogUrl}`}
									title="ตำนานหมึกย่างเยาวราช เด็ดจริง วันเป็น 1,000 ไม้!! | PEACH EAT LAEK"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
									allowfullscreen
								></iframe>
							</Container>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
							<Stack>
								<p>
									<i class="fa-brands fa-instagram fa-xl"></i> :{" "}
									{data.ytbId?.ytbContact[3].value}
								</p>
							</Stack>
							<Stack>
								<p>
									<i class="fa-brands fa-facebook fa-xl"></i> :{" "}
									{data.ytbId?.ytbContact[2].value}
								</p>
							</Stack>
							<Stack>
								<p>
									<i class="fa-brands fa-line fa-xl"></i> :{" "}
									{data.ytbId?.ytbContact[1].value}
								</p>
							</Stack>
							<Stack>
								<p>
									<i class="fa-brands fa-youtube fa-xl"></i> :{" "}
									{data.ytbId?.ytbContact[0].value}
								</p>
							</Stack>
						</Col>
					</Row>
				</Container>
			</Container>
			<Footer />
		</div>
	);
}
