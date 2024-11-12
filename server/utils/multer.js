//menjadikan multer sebagai buffer agar bisa disimpan imagekit
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage }).single("image"); // You can also set file size limits or file types
module.exports = upload;
