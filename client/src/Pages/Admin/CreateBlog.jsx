import React, { useContext, useEffect, useState } from "react";
import "./YoutuberAllBlog.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import img from "../../Pictures/image.png";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function CreateBlog() {
	const navigate = useNavigate();

	const url = window.location.pathname;
	const parts = url.split("/");
	const ytbId = parts[parts.length - 1];

	//setstate เพื่อสร้าง Blog
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDesc, setBlogDesc] = useState("");
	const [blogUrl, setBlogUrl] = useState("");
	const [blogThumbnail, setBlogThumbnail] = useState("");
	const [blogAddress, setBlogAddress] = useState("");
	const [blogLocation, setBlogLocation] = useState("");
	const [blogType, setBlogType] = useState("");

	//setstate ไฟล์รูปภาพ
	const [selectedImage, setSelectedImage] = useState(null);
	const [image, setImage] = useState("");

	const [readyToCreate, setReadyToCreate] = useState(false);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImage(file);

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		if (
			!blogTitle ||
			!image ||
			!blogDesc ||
			!blogAddress ||
			!blogLocation ||
			!blogType
		) {
			if (!blogTitle) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาใส่ชื่อบทความ",
				});
			} else if (!blogDesc) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาใส่คําอธิบายบทความ",
				});
			} else if (!image) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาเพิ่มรูปภาพ",
				});
			} else if (!blogAddress) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาใส่ที่อยู่",
				});
			} else if (!blogLocation) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาใส่ตําแหน่ง",
				});
			} else if (!blogType) {
				return Swal.fire({
					icon: "error",
					title: "เกิดข้อผิดพลาด!",
					text: "กรุณาใส่ประเภท",
				});
			}
		}
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "zywrcqlo");
		data.append("cloud_name", "dhjch8xod");
		try {
			if (image) {
				console.log("image");
				const response = await axios.post(
					"https://api.cloudinary.com/v1_1/dhjch8xod/image/upload",
					data
				);
				setBlogThumbnail(response.data.url.toString());
			}

			setReadyToCreate(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (readyToCreate) {
			try {
				axios.post(`${process.env.REACT_APP_API}/create-blog`, {
					blogTitle,
					blogDesc,
					blogUrl,
					blogThumbnail,
					blogAddress,
					blogLocation,
					blogType,
					ytbId,
				});
				Swal.fire({
					title: "สําเร็จ",
					text: "บันทึกข้อมูลสําเร็จ",
					icon: "success"
				});
				setReadyToCreate(false);
				navigate("/admin");
			} catch (error) {
				console.log(error);
			}
		}
	}, [readyToCreate]);

	return (
		<div className="vh-100 admin-bg">
			<Container className="vh-auto admin-bg text-white">
				<Form>
					<Row>
						<Container className="regisImage text-center">
							<Container>
								{!selectedImage && (
									<>
										<div
											style={{
												position: "relative",
												display: "inline-block",
												backgroundColor: "white",
												borderRadius: "30px",
											}}
											className="mb-5 mt-3"
										>
											<img src={img} alt="youtuber" className="profileImg" />
											<input
												id="upload-input"
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												style={{
													position: "absolute",
													top: 0,
													left: 0,
													width: "100%",
													height: "100%",
													opacity: 0,
													cursor: "pointer",
												}}
											/>
											<label
												htmlFor="upload-input"
												className="text-center w-100 pt-4"
												style={{
													position: "absolute",
													top: "110%",
													left: "50%",
													transform: "translate(-50%, -50%)",
												}}
											>
												กดที่รูปเพื่ออัพโหลดรูปภาพ 500x500 px
											</label>
										</div>
									</>
								)}
								{selectedImage && (
									<div>
										<img
											src={selectedImage}
											alt="Selected"
											style={{ maxWidth: "100%" }}
											className=" w-25 "
										/>
									</div>
								)}
							</Container>
						</Container>
					</Row>
					<Row>
						<Row className="mt-3">
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>ชื่อ Blog</Form.Label>
									<Form.Control
										type="text"
										onChange={(event) => setBlogTitle(event.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Label>เลือกประเภท</Form.Label>
								<Form.Select
									aria-label="Default select example"
									onChange={(e) => setBlogType(e.target.value)}
								>
									<option>(เลือกประเภท)</option>
									<option value="travel">ท่องเที่ยว</option>
									<option value="food">อาหาร</option>
								</Form.Select>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Label>ข้อมูลเพิ่มเติมของ Blog</Form.Label>
							<Form.Control
								as="textarea"
								style={{ height: "150px" }}
								onChange={(event) => setBlogDesc(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>URL ของวีดิโอ</Form.Label>
							<Form.Control
								onChange={(event) => setBlogUrl(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>ที่อยู่ของสถานที่</Form.Label>
							<Form.Control
								as="textarea"
								style={{ height: "100px" }}
								onChange={(event) => setBlogAddress(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>พิกัดของสถานที่</Form.Label>
							<Form.Control
								onChange={(event) => setBlogLocation(event.target.value)}
							/>
						</Form.Group>

						<Row className="mt-3 mb-4">
							<Col className="text-center">
								<Button
									variant="primary"
									className="w-75"
									onClick={handleCreateBlog}
								>
									สร้าง Blog
								</Button>
							</Col>
							<Col className="text-center">
								<Button variant="danger" className="w-75" href="/admin">
									ยกเลิก
								</Button>
							</Col>
						</Row>
					</Row>
				</Form>
			</Container>
		</div>
	);
}
