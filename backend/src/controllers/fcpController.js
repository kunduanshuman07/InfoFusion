import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/public/factCheckImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const factCheck = async (req, res) => {
  try {
    const uploadedFile = req.file;
    const description = req.body.description;
    const filePath = uploadedFile.path;
    res.json({ message: 'File uploaded successfully', filePath, description });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
