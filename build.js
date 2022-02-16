// build.js
// builds the public/ folder using contents of the src/ folder, populating the portfolio in index.html

const fs = require("fs")

// copy styles.css to /public
const css = fs.readFileSync("src/styles.css")
fs.writeFileSync(__dirname + "/public/styles.css", css)

// copy favicon.png to /public
const favicon = fs.readFileSync("src/favicon.png")
fs.writeFileSync(__dirname + "/public/favicon.png", favicon)

// copy shareimage.png to /public
const shareimage = fs.readFileSync("src/shareimage.png")
fs.writeFileSync(__dirname + "/public/shareimage.png", shareimage)

// copy link.png to /public
const linkimage = fs.readFileSync("src/link.png")
fs.writeFileSync(__dirname + "/public/link.png", linkimage)

// get index.html template and populate with projects from projects.json
const template = fs.readFileSync("src/index.html", "utf8")

const projects = JSON.parse(fs.readFileSync("projects.json", "utf8"))
let projectsHtml = ""

for(const project of projects.projects) {
    // const entry = `<p><a href="${project.link}" target="_blank">${project.title}</a> — ${project.description}</p>`
    const entry = `
    <a href="${project.link}" target="_blank" class="project-tile-link">
        <div class="project-tile">
            <div class="project-top">
                <p class="project-title">${project.title}</p>
                <img src="link.png" class="project-link-icon">
            </div>
            <p class="project-description">${project.description}</p>
        </div>
    </a>`;
    projectsHtml += entry
}

html = template.replace("PROJECTS", projectsHtml)
fs.writeFileSync(__dirname + "/public/index.html", html)