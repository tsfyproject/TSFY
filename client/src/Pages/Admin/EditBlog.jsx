import React, { useContext, useEffect, useState } from "react";
import "./YoutuberAllBlog.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditBlogEdit() {
	const navigate = useNavigate();

	const url = window.location.pathname;
	const parts = url.split("/");
	const blogId = parts[parts.length - 1];

	const [blogs, setBlogs] = useState([]);

	const [patchBlog, setPatchBlog] = useState(false);
	const [editImage, setEditImage] = useState(null);

	//setstate เพื่อสร้าง editBlogEdit
	const [blogEditTitle, setBlogEditTitle] = useState("");
	const [blogEditDesc, setBlogEditDesc] = useState("");
	const [blogEditUrl, setBlogEditUrl] = useState("");
	const [blogEditThumbnail, setBlogEditThumbnail] = useState("");
	const [blogEditAddress, setBlogEditAddress] = useState("");
	const [blogEditLocation, setBlogEditLocation] = useState("");
	const [blogEditType, setBlogEditType] = useState("");

	//setstate ไฟล์รูปภาพ
	const [selectedImage, setSelectedImage] = useState(null);
	const [image, setImage] = useState("");

	const fetchSingleBlog = async () => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API}/get-single-blog/${blogId}`
			);
			setBlogs(res.data);
			console.log(res.data);
		} catch (error) {
			console.error("Error fetching single blog:", error);
		}
	};
	useEffect(() => {
		fetchSingleBlog();
	}, []);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImage(file);

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const handleEditBlog = async () => {
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
				setEditImage(response.data.url.toString());
			}
			if (
				!blogEditTitle ||
				!image ||
				!blogEditDesc ||
				!blogEditAddress ||
				!blogEditLocation ||
				!blogEditType ||
				!blogEditUrl
			) {
				if (!blogEditTitle) {
					setBlogEditTitle(blogs.blogTitle);
				}
				if (!image) {
					setEditImage(blogs.blogThumbnail);
				}
				if (!blogEditDesc) {
					setBlogEditDesc(blogs.blogDesc);
				}
				if (!blogEditAddress) {
					setBlogEditAddress(blogs.blogAddress);
				}
				if (!blogEditLocation) {
					setBlogEditLocation(blogs.blogLocation);
				}
				if (!blogEditType) {
					setBlogEditType(blogs.blogType);
				}
				if (!blogEditUrl) {
					setBlogEditUrl(blogs.blogUrl);
				}
			}

			setPatchBlog(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (patchBlog) {
			axios
				.put(`${process.env.REACT_APP_API}/edit-blog`, {
					blogTitle: blogEditTitle,
					blogThumbnail: editImage,
					blogDesc: blogEditDesc,
					blogAddress: blogEditAddress,
					blogLocation: blogEditLocation,
					blogType: blogEditType,
					blogUrl: blogEditUrl,
					blogId: blogId,
				})
				.then((res) => {
					console.log(res);
					alert("บันทึกข้อมูลสําเร็จ");
					setPatchBlog(false);
					navigate("/admin");
				});
		}
	}, [patchBlog]);
	return (
		<div className="vh-auto admin-bg">
			<Container className="vh-100 admin-bg pt-5">
				<Form>
					<Row className="text-white">
						<h1>แก้ไข Blog</h1>
						<Container className="regisImage text-center">
							<Container>
								{!selectedImage && (
									<>
										<div
											style={{
												position: "relative",
												display: "inline-block",
											}}
											className="mb-5 mt-3"
										>
											<img
												src={blogs?.blogThumbnail}
												alt="youtuber"
												className="profileImg rounded-circle"
											/>
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
												className="text-center w-100 pt-4 "
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
					<Row className="text-white">
						<Row className="mt-3">
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>ชื่อ Blog</Form.Label>
									<Form.Control
										type="text"
										placeholder={blogs.blogTitle}
										onChange={(event) => setBlogEditTitle(event.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Label>เลือกประเภท</Form.Label>
								<Form.Select
									aria-label="Default select example"
									onChange={(e) => setBlogEditType(e.target.value)}
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
								placeholder={blogs.blogDesc}
								onChange={(event) => setBlogEditDesc(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>URL ของวีดิโอ</Form.Label>
							<Form.Control
								placeholder={blogs.blogUrl}
								onChange={(event) => setBlogEditUrl(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>ที่อยู่ของสถานที่</Form.Label>
							<Form.Control
								as="textarea"
								style={{ height: "100px" }}
								placeholder={blogs.blogAddress}
								onChange={(event) => setBlogEditAddress(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>พิกัดของสถานที่</Form.Label>
							<Form.Control
								placeholder={blogs.blogLocation}
								onChange={(event) => setBlogEditLocation(event.target.value)}
							/>
						</Form.Group>

						<Row className="mt-3 mb-4">
							<Col className="text-center">
								<Button
									variant="primary"
									className="w-75"
									onClick={handleEditBlog}
								>
									แก้ไข Blog
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
