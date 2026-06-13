const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/admin-login", (req, res) => {

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }

});
//This one is for to wakeup our
app.get('/ping', (req, res) => {
  res.send('pong');
});

// allow frontend to access uploaded files
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend running");
});
//---------------------------------- profile photo----------------------------------
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, "profile.jpg");
  },
});

const uploadProfile = multer({ storage: profileStorage });

app.post("/upload-profile", uploadProfile.single("image"), (req, res) => {
  res.json({ message: "Profile photo updated" });
});

// ================= CV UPLOAD =================

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "mycv.pdf");
  },
});

const uploadCV = multer({ storage: cvStorage });

app.post("/upload-cv", uploadCV.single("cv"), (req, res) => {
  res.json({ message: "CV uploaded successfully" });
});


// ================= PROJECT IMAGE UPLOAD =================

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/projects");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProject = multer({ storage: projectStorage });

app.post("/add-project", uploadProject.single("image"), (req, res) => {

  const projects = JSON.parse(fs.readFileSync("projects.json"));

  const newProject = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    tech: req.body.tech,
    link: req.body.link,
    gitlink: req.body.gitlink,
   image: req.file.filename
  };

  projects.push(newProject);

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(projects, null, 2)
  );

  res.json({ message: "Project saved successfully" });

});


// ================= GET PROJECTS =================

app.get("/projects", (req, res) => {

  const projects = JSON.parse(fs.readFileSync("projects.json"));

  res.json(projects);

});

// ================= Delete Project ================------------------------------------------
app.delete("/delete-project/:id", (req, res) => {

  const id = req.params.id;

  const projects = JSON.parse(
    fs.readFileSync("projects.json")
  );

  const projectToDelete = projects.find(p => p.id == id);

  if (!projectToDelete) {
    return res.json({ message: "Project not found" });
  }

  // correct image path
  const imagePath = path.join(
    __dirname,
    "uploads",
    "projects",
    projectToDelete.image
  );

  console.log("Deleting image:", imagePath);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log("Image deleted");
  } else {
    console.log("Image not found");
  }

  const updatedProjects = projects.filter(
    p => p.id != id
  );

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(updatedProjects, null, 2)
  );

  res.json({ message: "Project deleted" });

});

// ================= Update Project ================---------------------------------

app.put("/update-project/:id", (req, res) => {

  const id = req.params.id;

  const projects = JSON.parse(fs.readFileSync("projects.json"));

  const updatedProjects = projects.map((project) => {

    if (project.id == id) {
      return { ...project, ...req.body };
    }

    return project;
  });

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(updatedProjects, null, 2)
  );

  res.json({ message: "Project updated" });

});
// ================= Techstack ================-----------------------------------------------
const techStorage = multer.diskStorage({
 destination: (req,file,cb)=>{
  cb(null,"uploads/tech")
 },
 filename:(req,file,cb)=>{
  cb(null,Date.now()+"-"+file.originalname)
 }
})

const uploadTech = multer({storage:techStorage})

app.post("/add-tech", uploadTech.single("icon"), (req,res)=>{

 const techStack = JSON.parse(
  fs.readFileSync("techstack.json")
 )

 const newTech = {
  id:Date.now(),
  name:req.body.name,
  icon:req.file.filename
 }

 techStack.push(newTech)

 fs.writeFileSync(
  "techstack.json",
  JSON.stringify(techStack,null,2)
 )

 res.json({message:"Tech added"})

})
app.get("/techstack",(req,res)=>{

 const techStack = JSON.parse(
  fs.readFileSync("techstack.json")
 )

 res.json(techStack)

})
// techstack ko delete krne ke liye------------------------------------------------
app.delete("/delete-tech/:id",(req,res)=>{

 const id=req.params.id

 const techStack = JSON.parse(
  fs.readFileSync("techstack.json")
 )
 const techToDelete = techStack.find(t=>t.id==id)

 if(techToDelete){

  const iconPath = path.join(
   __dirname,
   "uploads",
   "tech",
   techToDelete.icon
  )

  if(fs.existsSync(iconPath)){
   fs.unlinkSync(iconPath)
  }

 }
//---------------------------Update krne ke liye techstack ko----------------------------------------
 const updated = techStack.filter(
  t=>t.id!=id
 )

 fs.writeFileSync(
  "techstack.json",
  JSON.stringify(updated,null,2)
 )

 res.json({message:"Tech deleted"})

})
// ---------------------------------------GET EXPERIENCE--------------------------------------------
app.get("/experience", (req, res) => {

  const data = JSON.parse(
    fs.readFileSync("experience.json")
  );

  res.json(data);

});


// -------------------ADD EXPERIENCE---------------------------------------
app.post("/add-experience", (req, res) => {

  const experiences = JSON.parse(
    fs.readFileSync("experience.json")
  );

  const newExperience = {
    id: Date.now(),
    title: req.body.title,
    organisation: req.body.organisation,
    location: req.body.location,
    date: req.body.date,
    type: req.body.type
  };

  experiences.push(newExperience);

  fs.writeFileSync(
    "experience.json",
    JSON.stringify(experiences, null, 2)
  );

  res.json({ message: "Experience added successfully" });

});


// DELETE EXPERIENCE
app.delete("/delete-experience/:id", (req, res) => {

  let experiences = JSON.parse(
    fs.readFileSync("experience.json")
  );

  experiences = experiences.filter(
    e => e.id != req.params.id
  );

  fs.writeFileSync(
    "experience.json",
    JSON.stringify(experiences, null, 2)
  );

  res.json({ message: "Experience deleted" });

});


// UPDATE EXPERIENCE
app.put("/update-experience/:id", (req, res) => {

  let experiences = JSON.parse(
    fs.readFileSync("experience.json")
  );

  experiences = experiences.map(e => {

    if(e.id == req.params.id){
      return { ...e, ...req.body };
    }

    return e;

  });

  fs.writeFileSync(
    "experience.json",
    JSON.stringify(experiences, null, 2)
  );

  res.json({ message: "Experience updated" });

});

app.listen(process.env.PORT ||5000, () => {
  console.log("Server running on port 5000");
});