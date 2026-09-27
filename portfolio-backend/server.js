const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const dns = require("dns");
require("dotenv").config();

// Fix Node.js DNS SRV lookup issues on Windows / local ISPs
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.log("DNS setServers warning:", e.message);
}

const app = express();

// ─── Cloudinary Config ────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Schemas & Models ─────────────────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  tech: String,
  link: String,
  gitlink: String,
  image: String,
});

const techSchema = new mongoose.Schema({
  id: Number,
  name: String,
  icon: String,
});

const experienceSchema = new mongoose.Schema({
  id: Number,
  title: String,
  organisation: String,
  location: String,
  date: String,
  type: String,
});

const Project = mongoose.model("Project", projectSchema);
const Tech = mongoose.model("Tech", techSchema);
const Experience = mongoose.model("Experience", experienceSchema);

// ─── Auto-seed function for initial JSON data ────────────────────────────────
async function seedInitialData() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 && fs.existsSync(path.join(__dirname, "projects.json"))) {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, "projects.json")));
      if (data.length > 0) {
        await Project.insertMany(data);
        console.log("Seeded initial projects data into MongoDB");
      }
    }

    const techCount = await Tech.countDocuments();
    if (techCount === 0 && fs.existsSync(path.join(__dirname, "techstack.json"))) {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, "techstack.json")));
      if (data.length > 0) {
        await Tech.insertMany(data);
        console.log("Seeded initial techstack data into MongoDB");
      }
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0 && fs.existsSync(path.join(__dirname, "experience.json"))) {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, "experience.json")));
      if (data.length > 0) {
        await Experience.insertMany(data);
        console.log("Seeded initial experience data into MongoDB");
      }
    }
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
}

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    seedInitialData();
  })
  .catch((err) => console.error("MongoDB error:", err));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Admin Login ──────────────────────────────────────────────────────────────
app.post("/admin-login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// ─── Ping ────────────────────────────────────────────────────────────────────
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.send("Backend running on Vercel ✅");
});

// ─────────────────────────────────────────────────────────────────────────────
//  PROFILE PHOTO
// ─────────────────────────────────────────────────────────────────────────────
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/profile",
    public_id: () => "profile",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    overwrite: true,
  },
});
const uploadProfile = multer({ storage: profileStorage });

app.post("/upload-profile", uploadProfile.single("image"), (req, res) => {
  res.json({ message: "Profile photo updated", url: req.file.path });
});

// ─────────────────────────────────────────────────────────────────────────────
//  CV UPLOAD
// ─────────────────────────────────────────────────────────────────────────────
const cvStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/cv",
    public_id: () => "mycv",
    resource_type: "raw",
    allowed_formats: ["pdf"],
    overwrite: true,
  },
});
const uploadCV = multer({ storage: cvStorage });

app.post("/upload-cv", uploadCV.single("cv"), (req, res) => {
  res.json({ message: "CV uploaded successfully", url: req.file.path });
});

// ─────────────────────────────────────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const uploadProject = multer({ storage: projectStorage });

// Add Project
app.post("/add-project", uploadProject.single("image"), async (req, res) => {
  try {
    const newProject = new Project({
      id: Date.now(),
      title: req.body.title,
      description: req.body.description,
      tech: req.body.tech,
      link: req.body.link,
      gitlink: req.body.gitlink,
      image: req.file.path, // full Cloudinary URL
    });
    await newProject.save();
    res.json({ message: "Project saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving project", error: err.message });
  }
});

// Get All Projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects && projects.length > 0) return res.json(projects);
    // Fallback to local projects.json if DB empty
    const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "projects.json")));
    res.json(localData);
  } catch (err) {
    try {
      const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "projects.json")));
      res.json(localData);
    } catch (e) {
      res.status(500).json({ message: "Error fetching projects", error: err.message });
    }
  }
});

// Delete Project
app.delete("/delete-project/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });

    if (!project) return res.json({ message: "Project not found" });

    // Delete image from Cloudinary
    if (project.image) {
      const urlParts = project.image.split("/");
      const fileWithExt = urlParts[urlParts.length - 1];
      const publicId = `portfolio/projects/${fileWithExt.split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    await Project.deleteOne({ id: req.params.id });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
});

// Update Project
app.put("/update-project/:id", async (req, res) => {
  try {
    await Project.updateOne({ id: req.params.id }, { $set: req.body });
    res.json({ message: "Project updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  TECH STACK
// ─────────────────────────────────────────────────────────────────────────────
const techStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/tech",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
  },
});
const uploadTech = multer({ storage: techStorage });

// Add Tech
app.post("/add-tech", uploadTech.single("icon"), async (req, res) => {
  try {
    const newTech = new Tech({
      id: Date.now(),
      name: req.body.name,
      icon: req.file.path, // full Cloudinary URL
    });
    await newTech.save();
    res.json({ message: "Tech added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding tech", error: err.message });
  }
});

// Get All Tech
app.get("/techstack", async (req, res) => {
  try {
    const techStack = await Tech.find();
    if (techStack && techStack.length > 0) return res.json(techStack);
    // Fallback to local techstack.json
    const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "techstack.json")));
    res.json(localData);
  } catch (err) {
    try {
      const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "techstack.json")));
      res.json(localData);
    } catch (e) {
      res.status(500).json({ message: "Error fetching tech stack", error: err.message });
    }
  }
});

// Delete Tech
app.delete("/delete-tech/:id", async (req, res) => {
  try {
    const tech = await Tech.findOne({ id: req.params.id });

    if (tech && tech.icon) {
      const urlParts = tech.icon.split("/");
      const fileWithExt = urlParts[urlParts.length - 1];
      const publicId = `portfolio/tech/${fileWithExt.split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    await Tech.deleteOne({ id: req.params.id });
    res.json({ message: "Tech deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tech", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

// Get Experience
app.get("/experience", async (req, res) => {
  try {
    const data = await Experience.find();
    if (data && data.length > 0) return res.json(data);
    // Fallback to local experience.json
    const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "experience.json")));
    res.json(localData);
  } catch (err) {
    try {
      const localData = JSON.parse(fs.readFileSync(path.join(__dirname, "experience.json")));
      res.json(localData);
    } catch (e) {
      res.status(500).json({ message: "Error fetching experience", error: err.message });
    }
  }
});

// Add Experience
app.post("/add-experience", async (req, res) => {
  try {
    const newExperience = new Experience({
      id: Date.now(),
      title: req.body.title,
      organisation: req.body.organisation,
      location: req.body.location,
      date: req.body.date,
      type: req.body.type,
    });
    await newExperience.save();
    res.json({ message: "Experience added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding experience", error: err.message });
  }
});

// Delete Experience
app.delete("/delete-experience/:id", async (req, res) => {
  try {
    await Experience.deleteOne({ id: req.params.id });
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting experience", error: err.message });
  }
});

// Update Experience
app.put("/update-experience/:id", async (req, res) => {
  try {
    await Experience.updateOne({ id: req.params.id }, { $set: req.body });
    res.json({ message: "Experience updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating experience", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  Start server (local dev only — Vercel handles this in production)
// ─────────────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;