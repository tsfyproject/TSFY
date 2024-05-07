import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Placedetail/Detail.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import YoutuberAllBlog from "./Pages/Admin/YoutuberAllBlog.jsx";
import CreateBlog from "./Pages/Admin/CreateBlog.jsx";
import EditBlog from "./Pages/Admin/EditBlog.jsx";

function App() {
  return (
    <div style={{ backgroundColor: "#F2F3F4" }}>
      <Routes>
        <Route index element={<Home />} />

        <Route path="/detail/:blogId" element={<Detail />} />
        <Route path="/youtuber-all-blogs/:id" element={<YoutuberAllBlog />} />
        <Route path="/create-blog/:id" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />


        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
