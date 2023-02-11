// build.js
// builds the public/ folder using contents of the src/ folder,
// populating the education, projects, and experience sections in index.html

console.info('[build] Building site')

const fs = require('fs-extra')

// copy static resources (images and styles.css) to /public
fs.copySync('src/static', __dirname + '/public/static')

// get profile information from profile.json
const profile = JSON.parse(fs.readFileSync('profile.json', 'utf8'))

// get the HTML templates
console.info('[build] Reading templates...')
const indexTemplate = fs.readFileSync('src/index.html', 'utf8')
const schoolTemplate = fs.readFileSync('src/templates/school.html', 'utf8')
const projectTemplate = fs.readFileSync('src/templates/project.html', 'utf8')
const experienceTemplate = fs.readFileSync('src/templates/experience.html', 'utf8')
const listElementTemplate = fs.readFileSync('src/templates/list_element.html', 'utf8')

// adds elements from a list of strings to an HTMl list, and returns it
const addElementsToList = list => {
    let listHtml = ''
    for (const element of list) {
        listHtml += listElementTemplate.replace(/ELEMENT/g, element)
    }
    return listHtml
}

let html = indexTemplate

// add general information
console.info('[build] Adding biographical information...')
html = html
    .replace(/NAME/g, profile.name)
    .replace(/SUMMARY/g, profile.summary)
    .replace(/BIOGRAPHY/g, profile.biography)

// add education information
console.info('[build] Adding education information...')
let educationHtml = ''
for (const school of profile.education.schools) {
    let schoolHtml = schoolTemplate

    schoolHtml = schoolHtml
        .replace(/SUBTITLE/g, school.subtitle)
        .replace(/TITLE/g, school.title)
        .replace(/LOCATION/g, school.location)
        .replace(/DATES_ATTENDED/g, school.dates_attended)
        .replace(/GRADUATION/g, school.graduation)
        .replace(/SUMMARY/g, school.summary)
        .replace(/HONORS_LIST/g, addElementsToList(school.honors))
        .replace(/COURSES_LIST/g, addElementsToList(school.courses))

    educationHtml += schoolHtml
}

// add project information
console.info('[build] Adding project information...')
let projectListHtml = ''
for (const project of profile.projects) {
    let projectHtml = projectTemplate

    // if there is no link, prevent the link from displaying
    projectHtml = projectHtml.replace(/URL_CLASS/g, (project.link) ? '' : 'invisible')

    projectHtml = projectHtml
        .replace(/TITLE/g, project.title)
        .replace(/URL/g, project.link)
        .replace(/DATE/g, project.date)
        .replace(/DESCRIPTION_LIST/g, addElementsToList(project.description))

    projectListHtml += projectHtml
}

// add experience information
console.info('[build] Adding experience information...')
let experienceListHtml = ''
for (const experience of profile.experience) {
    let experienceHtml = experienceTemplate

    experienceHtml = experienceHtml
        .replace(/COMPANY/g, experience.company)
        .replace(/LOCATION/g, experience.location)
        .replace(/DATE/g, experience.date)
        .replace(/JOB_TITLE/g, experience.title)
        .replace(/DESCRIPTION_LIST/g, addElementsToList(experience.description))

    experienceListHtml += experienceHtml
}

console.info('[build] Updating HTML...')
html = html.replace(/EDUCATION/g, educationHtml)
html = html.replace(/PROJECT_LIST/g, projectListHtml)
html = html.replace(/EXPERIENCE_LIST/g, experienceListHtml)

// write index.html to public/
console.info('[build] Writing files...')
fs.outputFileSync(__dirname + '/public/index.html', html)

console.info('[build] Done!')