//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"



function registerCrapsPlayer() {
    let crapsusername = document.getElementById(crapsUsernameInput).value
    removeRegistrationPane()
    showMainGameSection()
}
function removeRegistrationPane() {
    document.getElementById(crapsRegistrationPane).style.display = "none"
    alert(crapsusername)
}

function showMainGameSection() {
    document.getElementById(crapsMainSection).style.display = "block"
    alert(crapsusername)

}


