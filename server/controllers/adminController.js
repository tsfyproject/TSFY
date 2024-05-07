const Youtuber = require("../models/Youtuber");
const blogs = require("../models/Blog")

exports.createYtb = async (req, res) => {
  const { ytbName } = req.body;
  try {
    const newYtb = new Youtuber({
      ytbName: ytbName,
    });
    console.log(ytbName);
    await newYtb.save();
    return res.status(201).json({ message: "สำเร็จ" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllYoutubers = async (req, res) => {
  try {
    const youtubers = await Youtuber.find();
    return res.status(200).json(youtubers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSingleYoutubers = async (req, res) => {
  const { ytbId } = req.params;
  try {
    const singleYoutuber = await Youtuber.findOne({ _id: ytbId });
    return res.status(200).json(singleYoutuber);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.editYoutuber = async (req, res) => {
  const { ytbId, ytbName, ytbDesc, ytbContact, ytbImg } = req.body;
  console.log(ytbId, ytbName, ytbDesc, ytbContact, ytbImg);
  await Youtuber.findOneAndUpdate(
    { _id: ytbId },
    {
      ytbName: ytbName,
      ytbDesc: ytbDesc,
      ytbContact: ytbContact,
      ytbImg: ytbImg,
    }
  )
    .then((response) => {
      return res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
    })
    .catch(() => {
      return res.status(400).json({ message: "แก้ไขข้อมูลไม่สำเร็จ" });
    });
};

//ยังไม่ได้เช็คเงื่อนไข
exports.deleteYoutuber = async (req, res) => {
  const { ytbId } = req.body;
  console.log(ytbId)
  try {
    await blogs.deleteMany({ ytbId: ytbId });
    await Youtuber.findOneAndDelete({ _id: ytbId});

    return res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
