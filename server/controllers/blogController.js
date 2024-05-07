const blogs = require("../models/Blog");
const youtubers = require("../models/Youtuber");

exports.createBlog = async (req, res) => {
    const {blogTitle, blogDesc, blogUrl, blogThumbnail, blogAddress, blogLocation, ytbId, blogType} = req.body

    try {
        const newBlog = new blogs({
            blogTitle: blogTitle,
            blogDesc: blogDesc,
            blogUrl: blogUrl,
            blogThumbnail: blogThumbnail,
            blogAddress: blogAddress,
            blogLocation: blogLocation,
            blogType: blogType,
            ytbId: ytbId
        })
        await newBlog.save()
        return res.status(201).json({message: "สำเร็จ"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.getAllBlogFromYtb = async (req, res) => {
  const { ytbId } = req.params;
  try {
    const blog = await blogs.find({ ytbId: ytbId });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getsingleBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const singleBlog = await blogs.findOne({ _id: blogId }).populate("ytbId");
    return res.status(200).json(singleBlog);
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

exports.editBlog = async (req, res) => {
  const { blogId, blogTitle, blogDesc, blogUrl, blogThumbnail, blogAddress, blogLocation, blogType } = req.body;
  await blogs.findOneAndUpdate(
    { _id: blogId },
    {
      blogTitle: blogTitle,
      blogDesc: blogDesc,
      blogUrl: blogUrl,
      blogThumbnail: blogThumbnail,
      blogAddress: blogAddress,
      blogLocation: blogLocation,
      blogType: blogType
    }
  )
    .then((response) => {
      return res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
    })
    .catch(() => {
      return res.status(400).json({ message: "แก้ไขข้อมูลไม่สำเร็จ" });
    });
}

exports.deleteBlog = async (req, res) => {
  const { blogId} = req.body;
  
  await blogs.findOneAndDelete({ _id: blogId })
    .then((response) => {
      return res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
    })
    .catch(() => {
      return res.status(400).json({ message: "ลบข้อมูลไม่สำเร็จ" });
  })
}

exports.updateBlogView = async (req, res) => {
  const { id } = req.body;

  try {
    const blog = await blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // อัปเดตค่า blogView โดยเพิ่มขึ้นทีละ 1
    blog.blogView = blog.blogView + 1;
    await blog.save();

    return res.status(200).json({ message: 'Blog view updated successfully' });
  } catch (error) {
    console.error('Error updating blog view:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};