import React, { useContext, useEffect, useState } from "react";
import "./Admin.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import axios from "axios";

export default function Admin() {
	const [youtubers, setYoutubers] = useState([]);

	const [patchYoutuber, setPatchYoutuber] = useState(false);

	//Modal แก้ไขโปรไฟล์ Youtuber
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalDataEditProfile, setModalDataEditProfile] = useState(null);

	//Modal create yotuber
	const [showCreate, setShowCreate] = useState(false);
	const handleCloseYtb = () => setShowCreate(false);
	const handleShowYtb = () => setShowCreate(true);

	//Modal Delte Youtuber
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
	const handleShowConfirmDelete = () => setShowConfirmDelete(true);

	const [modalDataConfirmDelete, setModalDataConfirmDelete] = useState("");

	//setstate create Youtuber
	const [ytbName, setYtbName] = useState("");
	const handleChangeYtbName = (event) => setYtbName(event.target.value);

	//setstate แก้ไขโปรไฟล์ Youtuber
	const [editYtbName, setEditYtbName] = useState("");
	const [editYtbDesc, setEditYtbDesc] = useState("");
	const [editYtbContact, setEditYtbContact] = useState("");

	const [editImage, setEditImage] = useState("");

	const [youtube, setYoutube] = useState("");
	const [line, setLine] = useState("");
	const [facebook, setFacebook] = useState("");
	const [instagram, setInstagram] = useState("");

	//setstate ไฟล์รูปภาพ
	const [selectedImage, setSelectedImage] = useState(null);
	const [image, setImage] = useState("");

	const fetchYoutubers = async () => {
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_API}/get-ytb`);
			setYoutubers(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchYoutubers();
	}, []);

	const handleModalEditProfile = async (data) => {
		setModalDataEditProfile(data);
		setYoutube(data.ytbContact[0].value);
		setLine(data.ytbContact[1].value);
		setFacebook(data.ytbContact[2].value);
		setInstagram(data.ytbContact[3].value);
		handleShow();
	};

	const handleOpenModalConfirmDelete = async (data) => {
		handleShowConfirmDelete();
		setModalDataConfirmDelete(data);
	};

	const handleCloseModalConfirmDelete = async () => {
		handleCloseConfirmDelete();
		setModalDataConfirmDelete("");
	};

	const handleCloseModalEditProfile = async (data) => {
		setModalDataEditProfile(null);
		setSelectedImage("");
		setImage("");
		handleClose();
	};

	const handleModalCreateYtb = async (data) => {
		handleShowYtb();
	};

	const handleCloseModalCreateYtb = async (data) => {
		setYtbName("");
		handleCloseYtb();
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImage(file);

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const createBlog = async () => {
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
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitEditProfile = async () => {
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

			if (!editYtbName || !image || !editYtbDesc) {
				if (!editYtbName) {
					setEditYtbName(modalDataEditProfile.ytbName);
				}
				if (!editYtbDesc) {
					setEditYtbDesc(modalDataEditProfile.ytbDesc);
				}
				if (!editYtbContact) {
					setEditYtbContact(modalDataEditProfile.ytbContact);
				}
				if (!image) {
					console.log("noImage");
					setEditImage(modalDataEditProfile.ytbImg);
				}
			}
			await setEditYtbContact([
				{
					type: "youtube",
					value: youtube,
				},
				{
					type: "line",
					value: line,
				},
				{
					type: "facebook",
					value: facebook,
				},
				{
					type: "instagram",
					value: instagram,
				},
			]);

			setPatchYoutuber(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitCreateYtb = async () => {
		try {
			await axios.post(`${process.env.REACT_APP_API}/create-ytb`, { ytbName });
			alert("เพิ่มชื่อสำเร็จ");
			handleCloseModalCreateYtb();
		} catch (error) {
			console.error("Error creating Youtuber:", error);
		}
	};

	useEffect(() => {
		if (patchYoutuber) {
			console.log({
				ytbId: modalDataEditProfile?._id,
				ytbImg: editImage,
				ytbName: editYtbName,
				ytbDesc: editYtbDesc,
				ytbContact: editYtbContact,
			});
			axios.put(`${process.env.REACT_APP_API}/edit-ytb`, {
				ytbId: modalDataEditProfile?._id,
				ytbName: editYtbName,
				ytbDesc: editYtbDesc,
				ytbContact: editYtbContact,
				ytbImg: editImage,
			});

			setPatchYoutuber(false);
		}
		fetchYoutubers();

		handleCloseModalEditProfile();
		handleCloseModalCreateYtb();
	}, [patchYoutuber]);

	const deleteYoutuber = async (ytbId) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API}/delete-youtuber`, {
				data: {
					ytbId: modalDataConfirmDelete,
				},
			});
			alert("ลบ Youtuberเรียบร้อย");
			handleCloseModalConfirmDelete();
			fetchYoutubers();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="vh-auto admin-bg">
			<Container className="vh-auto admin-bg">
				<Row className="py-3">
					<Col xs={12} className="text-end">
						<Button
							variant={"success"}
							onClick={() => handleModalCreateYtb()}
							className="end-0"
						>
							{" "}
							เพิ่มชื่อ Youtuber{" "}
						</Button>
					</Col>
				</Row>
				<Row className="">
					<Table striped bordered hover className="table-striped" responsive="xl">
						<thead >
							<tr>
								<th>รูปภาพ Youtuber</th>
								<th>ข้อมูลของ Youtuber</th>
								<th>การจัดการ</th>
							</tr>
						</thead>
						<tbody>
							{youtubers.length > 0 ? (
								youtubers.map((data) => (
									<tr>
										<td className="tableImg">
											<img
												src={data.ytbImg}
												className="profileImg rounded-circle"
												alt="youtuber"
											></img>
										</td>
										<td >
											<p>ชื่อ : {data.ytbName}</p>
										</td>
										<td className="text-center">
											<Row className="w-50 h-100 d-flex mt-5 mx-auto">
												<Col className="">
												<Button
														href={`create-blog/${data._id}`}
														variant="success"
														className="mx-2 mb-2 w-100"
													>
														เพิ่มบทความ
													</Button>
													<Button
													variant="outline-primary"
													className="mx-2 mb-2 w-100"
													onClick={() => handleModalEditProfile(data)}
												>
													แก้ไขข้อมูล
												</Button>
													
												</Col>
												<Col>
												<Button
													variant="danger"
													className="mx-2 mb-2 w-100"
													onClick={() => handleOpenModalConfirmDelete(data._id)}
												>
													ลบข้อมูล
												</Button>
												
												<Button
														href={`youtuber-all-blogs/${data._id}`}
														variant="outline-dark"
														className="mx-2 mb-2 w-100"
													>
														เช็คบทความทั้งหมด
													</Button>
												</Col>
												
												
											</Row>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3">ไม่พบข้อมูล</td>
								</tr>
							)}
						</tbody>
					</Table>
				</Row>
			</Container>

			{/* Modal แก้ไขข้อมูล*/}
			<Modal
				show={show}
				onHide={handleCloseModalEditProfile}
				animation={true}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>{modalDataEditProfile?.ytbName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form>
							<div className="regisImage" style={{ textAlign: "center" }}>
								<div>
									{!selectedImage && (
										<>
											<div
												style={{
													position: "relative",
													display: "inline-block",
												}}
											>
												<img
													src={modalDataEditProfile?.ytbImg}
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
													className="text-center"
													style={{
														position: "absolute",
														top: "50%",
														left: "50%",
														transform: "translate(-50%, -50%)",
													}}
												>
													<span className="nunito-600">กดเพื่ออัพโหลดรูป</span>
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
												className="rounded-circle w-25 "
											/>
										</div>
									)}
								</div>
							</div>
							<Form.Group className="mb-3">
								<Form.Label>ชื่อ Youtuber</Form.Label>
								<Form.Control
									type="text"
									placeholder={modalDataEditProfile?.ytbName}
									onChange={(event) => setEditYtbName(event.target.value)}
								/>
							</Form.Group>
							<Form.Label>แหล่งข้อมูล</Form.Label>
							<Form.Group className="mb-3 border p-3">
								<p>Youtube</p>
								<Form.Control
									className="mb-3"
									type="text"
									placeholder={
										modalDataEditProfile?.ytbContact[0]?.value ||
										"กรอกชื่อช่อง Youtube"
									}
									onChange={(event) => setYoutube(event.target.value)}
								/>
								<p>Line</p>
								<Form.Control
									className="mb-3"
									type="text"
									placeholder={
										modalDataEditProfile?.ytbContact[1]?.value || "กรอก Line"
									}
									onChange={(event) => setLine(event.target.value)}
								/>
								<p>Facebook</p>
								<Form.Control
									className="mb-3"
									type="text"
									placeholder={
										modalDataEditProfile?.ytbContact[2]?.value ||
										"กรอก Facebook"
									}
									onChange={(event) => setFacebook(event.target.value)}
								/>
								<p>Instagram</p>
								<Form.Control
									className="mb-3"
									type="text"
									placeholder={
										modalDataEditProfile?.ytbContact[3]?.value || "กรอก IG"
									}
									onChange={(event) => setInstagram(event.target.value)}
								/>
							</Form.Group>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModalEditProfile}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmitEditProfile}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal เพิ่มyoutuber*/}
			<Modal
				show={showCreate}
				onHide={handleCloseModalCreateYtb}
				animation={true}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>ชื่อ Youtuber</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						type="text"
						value={ytbName}
						placeholder="กรอกชื่อ Youtuber"
						onChange={handleChangeYtbName}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModalCreateYtb}>
						ย้อนกลับ
					</Button>
					<Button variant="primary" onClick={handleSubmitCreateYtb}>
						เพิ่มชื่อ Youtuber
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showConfirmDelete}
				onHide={handleCloseModalConfirmDelete}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>คุณต้องการที่จะลบ?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Blog ทั้งหมดและ Youtuberคนนี้จะถูกลบหากคุณกดตกลง
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModalConfirmDelete}>
						ยกเลิก
					</Button>
					<Button variant="primary" onClick={deleteYoutuber}>
						ตกลง
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
