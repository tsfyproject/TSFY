const express = require("express");
const router = express.Router();
const {create,getAllBlogs,getTravelBlogs,getFoodBlogs,getYoutubers,getSearchAll,getSearchFood,getSearchTravel,sendEmail, getAllBlogsNewest, getTravelBlogsNewest, getFoodBlogsNewest,getSearchAllNewest,getSearchTravelNewest,getSearchFoodNewest} = require("../controllers/homeController");

router.get("/info",create)
router.get("/get-all-blogs",getAllBlogs)
router.get("/get-travel-blogs",getTravelBlogs)
router.get("/get-food-blogs",getFoodBlogs)
router.get("/get-youtubers",getYoutubers)
router.post("/get-search-all",getSearchAll)
router.post("/get-search-travel",getSearchTravel)
router.post("/get-search-food",getSearchFood)
router.post("/send-email",sendEmail)
router.get("/get-all-blogs-newest",getAllBlogsNewest)
router.get("/get-travel-blogs-newest",getTravelBlogsNewest)
router.get("/get-food-blogs-newest",getFoodBlogsNewest)
router.post("/get-search-all-newest",getSearchAllNewest)
router.post("/get-search-travel-newest",getSearchTravelNewest)
router.post("/get-search-food-newest",getSearchFoodNewest)

module.exports = router