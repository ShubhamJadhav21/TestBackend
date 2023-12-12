const userModel = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

// Configuration  of "Cloudinary" //
cloudinary.config({
  cloud_name: "ddraawvgd",
  api_key: 994722389161267,
  api_secret: "aMWYV3cdQ0UkSqZAfM8ec98OPto",
});

const createUser = async function (req, res) {
  try {
    const cloudinaryUploadPromises = req.files.map(async (file) => {
      if (!file) {
        return null;
      }

      const cloudinaryUploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "ravo",
          public_id: `your_prefix_${Date.now()}`,
        }
      );

      return cloudinaryUploadResult;
    });

    const cloudinaryResponses = await Promise.all(cloudinaryUploadPromises);
    // console.log("Cloudinary responses:", cloudinaryResponses);

    const cloudinaryUrls = cloudinaryResponses.map(
      (response) => response.secure_url
    );

    const userData = req.body;
    userData.selectedImages = cloudinaryUrls;
    const savedData = await userModel.create(userData);

    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

// module.exports = createUser;

const getUser = async function (req, res) {
  try {
    let findData = await userModel.find();

    if (findData.length == 0) {
      return res.status(404).send({ status: false, error: "No data found" });
    }
    return res.status(200).send({ status: true, data: findData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};
const getUserById = async function (req, res) {
  try {
    let findData = await userModel.findOne({_id:req.params._id});

    if (findData.length == 0) {
      return res.status(404).send({ status: false, error: "No data found" });
    }
    return res.status(200).send({ status: true, data: findData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getUserById = getUserById;