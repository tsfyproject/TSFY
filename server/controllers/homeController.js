const Youtuber = require("../models/Youtuber");
const Blogs = require("../models/Blog")
const nodemailer = require('nodemailer');


exports.create = (req, res) => {
  res.json("Hello World");
}

exports.getAllBlogs = (req, res) => {
  Blogs.find({}).sort({ blogView: -1 }).populate('ytbId')
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

exports.getTravelBlogs = (req, res) => {
  Blogs.find({ blogType: "travel" }).sort({ blogView: -1 }).populate('ytbId')
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

exports.getFoodBlogs = (req, res) => {
  Blogs.find({ blogType: "food" }).sort({ blogView: -1 }).populate('ytbId')
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

exports.getAllBlogsNewest = (req, res) => {
  Blogs.find({})
    .sort({ createdAt: -1 })
    .populate("ytbId")
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

exports.getTravelBlogsNewest = (req, res) => {
  Blogs.find({ blogType: "travel" })
    .sort({ createdAt: -1 })
    .populate("ytbId")
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

exports.getFoodBlogsNewest = (req, res) => {
  Blogs.find({ blogType: "food" })
    .sort({ createdAt: -1 })
    .populate("ytbId")
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

exports.getYoutubers = (req, res) => {
  Youtuber.find({}).sort({ ytbView: -1 })
    .then(youtubers => {
      res.json(youtubers);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

exports.getSearchAll = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [
        { ytbName: { $regex: searchKeyword, $options: "i" } },
      ],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map(y => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [
        { ytbId: { $in: ytbIds } },
      ]
    }).populate('ytbId');

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSearchTravel = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [
        { ytbName: { $regex: searchKeyword, $options: "i" } },
      ],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map(y => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [
        { ytbId: { $in: ytbIds } },
        { blogType: "travel" }
      ]
    }).populate('ytbId');

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getSearchFood = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [
        { ytbName: { $regex: searchKeyword, $options: "i" } },
      ],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map(y => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [
        { ytbId: { $in: ytbIds } },
        { blogType: "food" }
      ]
    }).populate('ytbId');

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSearchAllNewest = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [{ ytbName: { $regex: searchKeyword, $options: "i" } }],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map((y) => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [{ ytbId: { $in: ytbIds } }],
    })
      .populate("ytbId")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSearchTravelNewest = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [{ ytbName: { $regex: searchKeyword, $options: "i" } }],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map((y) => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [{ ytbId: { $in: ytbIds } }, { blogType: "travel" }],
    })
      .populate("ytbId")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSearchFoodNewest = async (req, res) => {
  const { searchKeyword } = req.body;

  let query = {};

  if (searchKeyword) {
    query = {
      $or: [{ ytbName: { $regex: searchKeyword, $options: "i" } }],
    };
  }

  try {
    const youtubers = await Youtuber.find(query);

    const ytbIds = youtubers.map((y) => y._id); // เปลี่ยนจาก y.ytbId เป็น y._id

    const blogs = await Blogs.find({
      $and: [{ ytbId: { $in: ytbIds } }, { blogType: "food" }],
    }).populate("ytbId").sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendEmail = async (req, res) => {
  const { email, message } = req.body;
  console.log(email, message)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // สร้างตัวแปรสำหรับเนื้อหาของอีเมลล์
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'New Message from user ', email,
    text: `Message from: ${email}\n\n${message}`
  };

  // ส่งอีเมลล์
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
}

