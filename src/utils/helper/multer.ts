import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/student-data/uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
                "-" +
                Date.now() +
                "-" +
                file.originalname.replace(" ", "_")
        );
    },
});

const upload = multer({ storage: storage }).single("marksheet");

export default {
    upload,
};
