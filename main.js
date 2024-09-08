
// Import necessary types from TypeScript
document.addEventListener("DOMContentLoaded", function () {
    // Define types for elements
    var form = document.getElementById("resume-form");
    var resumeContent = document.getElementById("resume-content");
    var shareableLink = document.getElementById("shareable-link");
    var copyLinkBtn = document.getElementById("copy-link-btn");
    var downloadBtn = document.getElementById("download-btn");
    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Collect user input data with type annotations
        var formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            degree: document.getElementById("degree").value,
            school: document.getElementById("school").value,
            gradYear: parseInt(document.getElementById("gradYear").value),
            jobTitle: document.getElementById("jobTitle").value,
            company: document.getElementById("company").value,
            years: parseInt(document.getElementById("years").value),
            skills: document.getElementById("skills")
                .value.split(",")
                .map(function (skill) { return skill.trim(); }),
        };
        // Generate the resume dynamically
        generateResume(formData);
        // Generate the unique URL
        var userName = formData.name.toLowerCase().replace(/\s+/g, "");
        var uniqueUrl = "resume-viewer.html?username=".concat(userName);
        localStorage.setItem(userName, JSON.stringify(formData)); // Save data
        // Update the shareable link
        shareableLink.href = uniqueUrl;
        shareableLink.textContent = "Open Resume: ".concat(uniqueUrl);
        shareableLink.style.display = "inline"; // Make the link visible
        // Enable "Copy Link" button
        copyLinkBtn.style.display = "inline-block";
        copyLinkBtn.addEventListener("click", function () {
            copyToClipboard("/".concat(uniqueUrl));
            alert("Link copied to clipboard!");
        });
    });
    // Function to generate and display the resume (non-editable)
    function generateResume(data) {
        resumeContent.innerHTML = "\n        <h3>".concat(data.name, "</h3>\n        <p>Email: ").concat(data.email, "</p>\n        <h4>Education</h4>\n        <p>").concat(data.degree, " from ").concat(data.school, " (Class of ").concat(data.gradYear, ")</p>\n        <h4>Work Experience</h4>\n        <p>").concat(data.jobTitle, " at ").concat(data.company, " (").concat(data.years, " years)</p>\n        <h4>Skills</h4>\n        <ul>\n            ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n        </ul>\n      ");
    }
    // Function to copy link to clipboard
    function copyToClipboard(text) {
        var tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }
    // Download resume as PDF
    downloadBtn.addEventListener("click", function () {
        var resumeElement = document.getElementById("resume");
        var opt = {
            margin: 1,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        // @ts-ignore
        html2pdf().from(resumeElement).set(opt).save();
    });
});
