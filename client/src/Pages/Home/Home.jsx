import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
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
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import "@fortawesome/fontawesome-free/css/all.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import axios from "axios";

export default function Home() {
  const [showMoreCount, setShowMoreCount] = useState(9);
  const [filter, setFilter] = useState("hot");
  // set state
  const [youtubers, setYoutubers] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [travelPlaces, setTravelPlaces] = useState([]);
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [allPlacesHot, setAllPlacesHot] = useState([]);
  const [travelPlacesHot, setTravelPlacesHot] = useState([]);
  const [foodPlacesHot, setFoodPlacesHot] = useState([]);
  const [allPlacesNewest, setAllPlacesNewest] = useState([]);
  const [foodPlacesNewest, setFoodPlacesNewest] = useState([]);
  const [travelPlacesNewest, setTravelPlacesNewest] = useState([]);

  const [fetchDone, setFetchDone] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const [selectedValue, setSelectedValue] = useState("allblogs");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [modalData, setModalData] = useState(null);

  //Modal data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle click
  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const handleSelectedClick = (value) => {
    setSelectedValue(value);
  };

  const handleShowModal = async (data) => {
    console.log(data);
    setModalData(data);
    handleShow();
  };

  const handleCloseModal = async (data) => {
    setModalData("");
    handleClose();
  };

  // fetch data
  const fetchDataYoutuber = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-youtubers`)
      .then((response) => {
        setYoutubers(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };

  const fetchDataTypeAll = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-all-blogs`)
      .then((response) => {
        setAllPlacesHot(response.data);
        setAllPlaces(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };
  const fetchDataTypeTravel = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-travel-blogs`)
      .then((response) => {
        setTravelPlacesHot(response.data);
        setTravelPlaces(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };
  const fetchDataTypeFood = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-food-blogs`)
      .then((response) => {
        setFoodPlacesHot(response.data);
        setFoodPlaces(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };

  const fetchDataTypeAllNewest = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-all-blogs-newest`)
      .then((response) => {
        setAllPlacesNewest(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };

  const fetchDataTypeFoodNewest = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-food-blogs-newest`)
      .then((response) => {
        setFoodPlacesNewest(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };

  const fetchDataTypeTravelNewest = () => {
    axios
      .get(`${process.env.REACT_APP_API}/get-travel-blogs-newest`)
      .then((response) => {
        setTravelPlacesNewest(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  };

  const handleSearch = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/get-search-all`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setAllPlacesHot(res.data);
          setAllPlacesNewest(res.data);
        } else {
          setAllPlacesHot(res.data);
        }
      });

    await axios
      .post(`${process.env.REACT_APP_API}/get-search-travel`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setTravelPlacesHot(res.data);
        } else {
          setTravelPlacesHot(res.data);
        }
      });

    await axios
      .post(`${process.env.REACT_APP_API}/get-search-food`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setFoodPlacesHot(res.data);
        } else {
          setFoodPlacesHot(res.data);
        }
      });

    await axios
      .post(`${process.env.REACT_APP_API}/get-search-all-newest`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setAllPlacesNewest(res.data);
        } else {
          setAllPlacesNewest(res.data);
        }
      })
      .catch((err) => alert(err));

    await axios
      .post(`${process.env.REACT_APP_API}/get-search-travel-newest`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setTravelPlacesNewest(res.data);
        } else {
          setTravelPlacesNewest(res.data);
        }
      })
      .catch((err) => alert(err));

    await axios
      .post(`${process.env.REACT_APP_API}/get-search-food-newest`, { searchKeyword })
      .then(async (res) => {
        if (res.data.length === 0) {
          setFoodPlacesNewest(res.data);
        } else {
          setFoodPlacesNewest(res.data);
        }
      })
      .catch((err) => alert(err));

    await setSearchDone(true);
  };

  useEffect(() => {
    fetchDataTypeAll();
    fetchDataTypeTravel();
    fetchDataTypeFood();
    fetchDataYoutuber();
    fetchDataTypeAllNewest();
    fetchDataTypeTravelNewest();
    fetchDataTypeFoodNewest();
    setFetchDone(true);
  }, []);

  useEffect(() => {
    if (fetchDone) {
      if (filter === "hot") {
        setAllPlaces(allPlacesHot);
        setTravelPlaces(travelPlacesHot);
        setFoodPlaces(foodPlacesHot);
      } else if (filter === "newest") {
        setAllPlaces(allPlacesNewest);
        setTravelPlaces(travelPlacesNewest);
        setFoodPlaces(foodPlacesNewest);
      }
      setSearchDone(false);
    }
  }, [fetchDone, filter, searchDone]);

  const handleCountView = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/update-blog-view`, {
        id: id,
      });
      console.log("Blog view updated");
    } catch (error) {
      console.error("Error updating blog view:", error);
    }
  };

  return (
    <div className="backgroundColor">
      <Navbar />
      <Container className="heroSection">
        <Row>
          <Col>
            <div className="w-100 pt-5">
              <h1 className="headerText text-center text-white">
                เว็บไซต์เที่ยวตาม Youtuber
              </h1>
            </div>
            <div className="w-100 d-flex flex-column gap-5 mt-5">
              <label className="descText text-center text-white">
                ยินดีต้อนรับสู่ เว็บไซต์เที่ยวตาม Youtuber
                เว็บไซต์นี้เป็นส่วนหนึ่งในการแนะนำสถานที่ต่างๆที่จะพาคุณไปเที่ยวตาม
                Youtuber ได้และสามารถหาเพื่อนได้จากที่นี่
              </label>
              <Container className="mx-auto mb-5 text-center">
                <div className="mx-5 py-3 w-auto  d-flex">
                  <Row className="p-4 d-flex mx-auto filterFrame">
                    <Col className="w-100" lg={2}>
                      <p
                        className="text-center"
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: "#0B0E27",
                          textWrap: "nowrap",
                        }}
                      >
                        ค้นหา Youtuber
                      </p>
                    </Col>
                    <Col className="w-100 d-flex gap-2" lg={8}>
                      <Form className="w-100">
                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Control
                            className=""
                            placeholder="Peach eat laek, Karn May, ..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                      <Button
                        variant="dark"
                        className="w-auto"
                        onClick={handleSearch}
                      >
                        ค้นหา
                      </Button>{" "}
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="cardSection mb-3" id="mainSec">
        <ButtonGroup
          aria-label="Basic example"
          className=" align-self-end position-absolute"
        >
          <Button variant="dark" onClick={() => setFilter("hot")}>
            ยอดนิยม
          </Button>
          <Button variant="dark" onClick={() => setFilter("newest")}>
            ใหม่ล่าสุด
          </Button>
        </ButtonGroup>
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
          <Nav className="flex">
            <Nav.Item>
              <Nav.Link eventKey="all">ทั้งหมด</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="food">ร้านอาหาร</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="travel">สถานที่</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="all">
              <Row className="rowModi mt-4">
                {allPlaces.length > 0 ? (
                  allPlaces.slice(0, showMoreCount).map((allPlace) => (
                    <Col
                      className="colModi"
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                    >
                      <Container
                        className="cardModi pb-3"
                        onClick={() => handleShowModal(allPlace)}
                      >
                        <Image
                          src={allPlace.blogThumbnail}
                          className="imgModi cover-fill"
                          rounded
                        />
                        <div className="d-flex gap-5">
                          {allPlace.blogTitle.length > 25
                            ? allPlace.blogTitle.substring(0, 25) + "..."
                            : allPlace.blogTitle}{" "}
                          <div>
                            <i class="fa-regular fa-eye"></i>{" "}
                            {allPlace.blogView}
                          </div>
                        </div>
                      </Container>
                    </Col>
                  ))
                ) : (
                  <div className="text-white">ไม่มีบทความในขณะนี้</div>
                )}
              </Row>
              {allPlaces.length > showMoreCount && (
                <Row className="my-3">
                  <Button
                    variant="light"
                    type="button"
                    className="buttonText"
                    onClick={() =>
                      setShowMoreCount((prevCount) => prevCount + 6)
                    }
                  >
                    ดูเพิ่มเติม
                  </Button>
                </Row>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="food">
              <Row className="rowModi">
                {foodPlaces.length > 0 ? (
                  foodPlaces.slice(0, showMoreCount).map((foodPlace) => (
                    <Col
                      className="colModi"
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                    >
                      <Container
                        className="cardModi pb-3"
                        onClick={() => handleShowModal(foodPlace)}
                      >
                        <Image
                          src={foodPlace.blogThumbnail}
                          className="imgModi"
                          rounded
                        />
                        <div className="d-flex gap-5">
                          {foodPlace.blogTitle.length > 25
                            ? foodPlace.blogTitle.substring(0, 25) + "..."
                            : foodPlace.blogTitle}{" "}
                          <div>
                            <i class="fa-regular fa-eye"></i>{" "}
                            {foodPlace.blogView}
                          </div>
                        </div>
                      </Container>
                    </Col>
                  ))
                ) : (
                  <div>ไม่มีบทความในขณะนี้</div>
                )}
              </Row>
              {foodPlaces.length > showMoreCount && (
                <Row className="my-3">
                  <Button
                    variant="light"
                    type="button"
                    className="buttonText"
                    onClick={() =>
                      setShowMoreCount((prevCount) => prevCount + 6)
                    }
                  >
                    ดูเพิ่มเติม
                  </Button>
                </Row>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="travel">
              <Row className="rowModi">
                {travelPlaces.length > 0 ? (
                  travelPlaces.slice(0, showMoreCount).map((travelPlace) => (
                    <Col
                      className="colModi"
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                    >
                      <Container
                        className="cardModi pb-3"
                        onClick={() => handleShowModal(travelPlace)}
                      >
                        <Image
                          src={travelPlace.blogThumbnail}
                          className="imgModi"
                          rounded
                        />
                        <div className="d-flex gap-5">
                          {travelPlace.blogTitle.length > 25
                            ? travelPlace.blogTitle.substring(0, 25) + "..."
                            : travelPlace.blogTitle}{" "}
                          <i class="fa-regular fa-eye"></i>{" "}
                          {travelPlace.blogView}
                        </div>
                      </Container>
                    </Col>
                  ))
                ) : (
                  <div className="text-white">ไม่มีบทความในขณะนี้</div>
                )}
              </Row>
              {travelPlaces.length > showMoreCount && (
                <Row className="my-3">
                  <Button
                    variant="light"
                    type="button"
                    className="buttonText"
                    onClick={() =>
                      setShowMoreCount((prevCount) => prevCount + 3)
                    }
                  >
                    ดูเพิ่มเติม
                  </Button>
                </Row>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        {/* {places.length > 0 ? (places.map((place)=>(<div></div>))):(<div></div>)} */}

        {/* <Tabs
					defaultActiveKey="all"
					id="uncontrolled-tab-example"
					className="mb-3"
					activeKey={activeTab}
					onSelect={handleTabSelect}
				>
					<Tab eventKey="all" title="ทั้งหมด" style={{color:"#fff"}}>
						<Row className="rowModi">
							{allPlaces.length > 0 ? (
								allPlaces.slice(0, showMoreCount).map((allPlace) => (
									<Col
										className="colModi"
										xxl={4}
										xl={4}
										lg={4}
										md={4}
										sm={12}
										xs={12}
									>
										<Container
											className="cardModi pb-3"
											onClick={() => handleShowModal(allPlace)}
										>
											<Image
												src={allPlace.blogThumbnail}
												className="imgModi cover-fill"
												rounded
											/>
											<div className="d-flex gap-5">
												{allPlace.blogTitle.length > 25
													? allPlace.blogTitle.substring(0, 25) + "..."
													: allPlace.blogTitle}{" "}
												<div>
													<i class="fa-regular fa-eye"></i> {allPlace.blogView}
												</div>
											</div>
										</Container>
									</Col>
								))
							) : (
								<div className="text-white">ไม่มีบทความในขณะนี้</div>
							)}
						</Row>
						{allPlaces.length > showMoreCount && (
							<Row className="my-3">
								<Button
									variant="light"
									type="button"
									className="buttonText"
									onClick={() => setShowMoreCount((prevCount) => prevCount + 6)}
								>
									ดูเพิ่มเติม
								</Button>
							</Row>
						)}
					</Tab>
					<Tab eventKey="food" title="ร้านอาหาร">
						<Row className="rowModi">
							{foodPlaces.length > 0 ? (
								foodPlaces.slice(0, showMoreCount).map((foodPlace) => (
									<Col
										className="colModi"
										xxl={4}
										xl={4}
										lg={4}
										md={4}
										sm={12}
										xs={12}
									>
										<Container
											className="cardModi pb-3"
											onClick={() => handleShowModal(foodPlace)}
										>
											<Image
												src={foodPlace.blogThumbnail}
												className="imgModi"
												rounded
											/>
											<div className="d-flex gap-5">
												{foodPlace.blogTitle.length > 25
													? foodPlace.blogTitle.substring(0, 25) + "..."
													: foodPlace.blogTitle}{" "}
												<div>
													<i class="fa-regular fa-eye"></i> {foodPlace.blogView}
												</div>
											</div>
										</Container>
									</Col>
								))
							) : (
								<div>ไม่มีบทความในขณะนี้</div>
							)}
						</Row>
						{foodPlaces.length > showMoreCount && (
							<Row className="my-3">
								<Button
									variant="light"
									type="button"
									className="buttonText"
									onClick={() => setShowMoreCount((prevCount) => prevCount + 6)}
								>
									ดูเพิ่มเติม
								</Button>
							</Row>
						)}
					</Tab>
					<Tab eventKey="travel" title="สถานที่">
						<Row className="rowModi">
							{travelPlaces.length > 0 ? (
								travelPlaces.slice(0, showMoreCount).map((travelPlace) => (
									<Col
										className="colModi"
										xxl={4}
										xl={4}
										lg={4}
										md={4}
										sm={12}
										xs={12}
									>
										<Container
											className="cardModi pb-3"
											onClick={() => handleShowModal(travelPlace)}
										>
											<Image
												src={travelPlace.blogThumbnail}
												className="imgModi"
												rounded
											/>
											<div className="d-flex gap-5">
												{travelPlace.blogTitle.length > 25
													? travelPlace.blogTitle.substring(0, 25) + "..."
													: travelPlace.blogTitle}{" "}
												<i class="fa-regular fa-eye"></i> {travelPlace.blogView}
											</div>
										</Container>
									</Col>
								))
							) : (
								<div className="text-white">ไม่มีบทความในขณะนี้</div>
							)}
						</Row>
						{travelPlaces.length > showMoreCount && (
							<Row className="my-3">
								<Button
									variant="light"
									type="button"
									className="buttonText"
									onClick={() => setShowMoreCount((prevCount) => prevCount + 3)}
								>
									ดูเพิ่มเติม
								</Button>
							</Row>
						)}
					</Tab>
				</Tabs> */}
      </Container>
      <Footer />
      <Modal
        size="xl"
        show={show}
        centered
        onHide={() => handleCloseModal()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="justify-content-center m-3">
          <Row>
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12}>
              <div className="mx-auto d-flex">
                <Image
                  src={modalData?.blogThumbnail}
                  className="imgModi w-100 mx-auto"
                  rounded
                />
              </div>
            </Col>
            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12} className="p-5">
              <Row className="gap-3">
                <Modal.Title id="example-modal-sizes-title-lg">
                  {modalData?.blogTitle}
                  {/* {modalData?.blogTitle?.length > 30
										? modalData?.blogTitle.substring(0, 30) + "..."
										: modalData?.blogTitle} */}
                </Modal.Title>
                <Row>
                  <Col className="text-start">{modalData?.ytbId?.ytbName}</Col>
                  <Col className="text-center">
                    {new Date(modalData?.createdAt).toLocaleDateString()}
                  </Col>
                  <Col className="text-end">
                    <i class="fa-regular fa-eye"></i> {modalData?.blogView}
                  </Col>
                </Row>
                <div className="text-start mx-auto"></div>
                <div className="text-start mx-auto">
                  {/* {modalData?.blogDesc} */}
                  {modalData?.blogDesc?.length > 300
                    ? modalData?.blogDesc.substring(0, 300) + "..."
                    : modalData?.blogDesc}
                </div>
                <div className="text-start mx-auto"></div>
                <div className="text-end mx-auto"></div>
              </Row>
              <Row className="pt-3">
                <Button
                  variant="dark w-50 mx-auto"
                  href={`detail/${modalData?._id}`}
                  onClick={() => handleCountView(modalData?._id)}
                >
                  อ่านเพิ่มเติม
                </Button>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
