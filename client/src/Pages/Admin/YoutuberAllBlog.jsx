import React, { useContext, useEffect, useState } from "react";
import "./YoutuberAllBlog.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from 'sweetalert2'

export default function YoutuberAllBlog() {
	const url = window.location.pathname;
	const parts = url.split("/");
	const blogId = parts[parts.length - 1];

	const [allblogs, setAllBlogs] = useState([]);
	const [youtubers, setYoutubers] = useState([]);

	//Modal Delte Youtuber
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
	const handleShowConfirmDelete = () => setShowConfirmDelete(true);

	const [modalDataConfirmDelete, setModalDataConfirmDelete] = useState("");

	const handleOpenModalConfirmDelete = async (data) => {
		handleShowConfirmDelete();
		setModalDataConfirmDelete(data);
	};

	const handleCloseModalConfirmDelete = async () => {
		handleCloseConfirmDelete();
		setModalDataConfirmDelete("");
	};

	const fetchAllBlogs = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/get-blog/${blogId}`
			);
			setAllBlogs(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchYoutubers = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/get-single-ytb/${blogId}`
			);
			setYoutubers(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchAllBlogs();
		fetchYoutubers();
	}, []);

	//กดแล้วลบเลยยังไม่ได้ใส่ alert
	const deleteBlog = async (blogId) => {
		try {
			console.log("blogid", blogId);
			await axios.delete(`${process.env.REACT_APP_API}/delete-blog`, {
				data: {
					blogId: modalDataConfirmDelete,
				},
			});
			Swal.fire({
				title: "สําเร็จ",
				text: "ลบบทความเรียบร้อยแล้ว",
				icon: "success"
			});
			handleCloseModalConfirmDelete();
			fetchAllBlogs();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Container className="p-5 text-center">
				<h1 className="mb-5">บทความทั้งหมด ของ {youtubers.ytbName} </h1>
				<Row className="py-3">
					<Col xs={12} className="text-end">
						<Button variant={"secondary"} className="end-0" href="/admin">
							{" "}
							ย้อนกลับ{" "}
						</Button>
					</Col>
				</Row>
				<Row>
					{allblogs.length > 0 ? (
						allblogs.map((allblogs) => (
							<Container className="bg-white mb-3">
								<Row>
									<Col>
										<img
											src={allblogs.blogThumbnail}
											alt="thumbnail"
											className="img-thumbnail"
										></img>
									</Col>
									<Col className="m-auto">
										<p>ชื่อบทความ : {allblogs.blogTitle}</p>
									</Col>
									<Col className="m-auto">
										<Button
											href={`/edit-blog/${allblogs._id}`}
											className=""
											variant="outline-primary"
										>
											แก้ไขบทความ
										</Button>
										<Button
											onClick={() => handleOpenModalConfirmDelete(allblogs._id)}
											variant="danger"
											className="ms-3"
										>
											ลบบทความ
										</Button>
									</Col>
								</Row>
							</Container>
						))
					) : (
						<p>ยังไม่มีบทความ</p>
					)}
				</Row>
			</Container>

			<Modal
				show={showConfirmDelete}
				onHide={handleCloseModalConfirmDelete}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>คุณต้องการที่จะลบ?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Blog ทั้งหมดและยูทูปเบอร์คนนี้จะถูกลบหากคุณกดตกลง
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModalConfirmDelete}>
						ยกเลิก
					</Button>
					<Button variant="primary" onClick={deleteBlog}>
						ตกลง
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
