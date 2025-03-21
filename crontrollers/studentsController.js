import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const studentIndexShow = (req, res) => {
    const allData = fs.readFileSync(path.join(__dirname, "../api/students.json"))
    res.render("students/index", {stdData : JSON.parse(allData.toString())})
    
    
}
export const studentAddPage = (req, res) => {
    res.render("students/add")
}
export const studentEditPage = (req, res) => {
    const {id} = req.params
    const allData = JSON.parse(fs.readFileSync(path.join(__dirname, "../api/students.json")))
    const editData = allData.find(data => data.id == id)
    
    res.render("students/edit", {editData : editData})
}

// view single user
export const studentSinglePage = (req, res) => {
    const allData = fs.readFileSync(path.join(__dirname, "../api/students.json"))
    const jsonData = JSON.parse(allData)
    const singleData = jsonData.filter(data => data.id == req.params.id)
    
    
    res.render("students/single", {student : singleData[0]})
}

// add new students data
export const studentAdd = (req, res) => {
    const allData = fs.readFileSync(path.join(__dirname, "../api/students.json"))
    const jsonData = JSON.parse(allData)
    const {name, email, call, img} = req.body

    
    const pushId = jsonData[0] ? Number(jsonData[jsonData.length-1].id)+1 : 1
    jsonData.push({
        id : pushId,
        name : name,
        email : email,
        call : call,
        image : req.file.filename
        // image : req.file.name
    })
   fs.writeFileSync(path.join(__dirname, "../api/students.json"), JSON.stringify(jsonData))

   res.redirect("/")
   
}





// delete students
export const studentDelete = (req, res) =>{
    const {id} = req.params;
    
    // delete user data
    const allStdData = JSON.parse(fs.readFileSync(path.join(__dirname, "../api/students.json")))
    const updatedData = allStdData.filter(data => data.id != id);
    fs.writeFileSync(path.join(__dirname, "../api/students.json"), JSON.stringify(updatedData))

    // delete image
    const imgName = allStdData.find(data => data.id == id).image;
    fs.unlinkSync(path.join(__dirname, `../public/images/${imgName}`))
    
    
    
    res.redirect("/")
    
}





export const editsinglestudents = (req, res) => {

const {id, name, email, call} = req.body
let allData = JSON.parse(fs.readFileSync(path.join(__dirname, "../api/students.json")))
const indexNum = allData.findIndex(data => data.id == id)




    if (req.file) {
        fs.unlinkSync(path.join(__dirname, `../public/images/${allData[indexNum].image}`))
        allData[indexNum] = {...allData[indexNum], 
            name : name,
            email : email,
            call : call,
            image : req.file.filename
        }
    }else{
        allData[indexNum] = {...allData[indexNum], 
            name : name,
            email : email,
            call : call,
        }
    }

    fs.writeFileSync(path.join(__dirname, "../api/students.json"), JSON.stringify(allData))
    res.redirect("/")
}