import express from "express"
import { studentIndexShow, studentAddPage, studentEditPage, studentSinglePage, studentAdd, studentDelete, editsinglestudents} from "../crontrollers/studentsController.js"
import multer from "multer"
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()




// multer Initial
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{        
        cb(null, path.join(__dirname, "../public/images/"))
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const profileImageUpload = multer({
    storage : storage
}).single("profile-picture")








router.get("/", studentIndexShow)
router.get("/add", studentAddPage)
router.get("/edit/:id", studentEditPage)
router.get("/single/:id", studentSinglePage)
router.post("/addstudent", profileImageUpload, studentAdd)
router.get("/deletestudents/:id", studentDelete)
router.post("/editsinglestudents", profileImageUpload, editsinglestudents)










export default router