// build.js
// builds the public/ folder using contents of the src/ folder,
// populating the portfolio in index.html

const fs = require("fs-extra")

// copy static resources (images and styles.css) to /public
fs.copySync("src/static", __dirname + "/public/static")

// get all projects from projects.json
const projects = JSON.parse(fs.readFileSync("projects.json", "utf8"))
let projectsHtml = ""

// add each project in projects.json to an HTML string as a portfolio projct tile
for(const project of projects.projects) {
    const entry = `
    <a href="${project.link}" target="_blank" class="project-tile-link">    
        <div class="project-tile">
            <div class="project-top">
                <p class="project-title">${project.title}</p>
                <img src="static/link.png" class="project-link-icon">
            </div>
            <p class="project-description">${project.description}</p>
        </div>
    </a>`

    projectsHtml += entry
}

// get index.html template from src/ and populate the portfolio with projects
const template = fs.readFileSync("src/index.html", "utf8")
html = template.replace("PROJECTS", projectsHtml)

// write index.html to public/
fs.outputFileSync(__dirname + "/public/index.html", html)