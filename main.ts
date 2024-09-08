
// Import necessary types from TypeScript
document.addEventListener("DOMContentLoaded", () => {
  // Define types for elements
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const resumeContent = document.getElementById("resume-content") as HTMLElement;
  const shareableLink = document.getElementById("shareable-link") as HTMLAnchorElement;
  const copyLinkBtn = document.getElementById("copy-link-btn") as HTMLButtonElement;
  const downloadBtn = document.getElementById("download-btn") as HTMLButtonElement;

  // Event listener for form submission
  form.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Collect user input data with type annotations
    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      degree: (document.getElementById("degree") as HTMLInputElement).value,
      school: (document.getElementById("school") as HTMLInputElement).value,
      gradYear: parseInt((document.getElementById("gradYear") as HTMLInputElement).value),
      jobTitle: (document.getElementById("jobTitle") as HTMLInputElement).value,
      company: (document.getElementById("company") as HTMLInputElement).value,
      years: parseInt((document.getElementById("years") as HTMLInputElement).value),
      skills: (document.getElementById("skills") as HTMLInputElement)
        .value.split(",")
        .map((skill: string) => skill.trim()),
    };

    // Generate the resume dynamically
    generateResume(formData);

    // Generate the unique URL
    const userName = formData.name.toLowerCase().replace(/\s+/g, "");
    const uniqueUrl = `resume-viewer.html?username=${userName}`;
    localStorage.setItem(userName, JSON.stringify(formData)); // Save data

    // Update the shareable link
    shareableLink.href = uniqueUrl;
    shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
    shareableLink.style.display = "inline"; // Make the link visible

    // Enable "Copy Link" button
    copyLinkBtn.style.display = "inline-block";
    copyLinkBtn.addEventListener("click", function () {
      copyToClipboard(`/${uniqueUrl}`);
      alert("Link copied to clipboard!");
    });
  });

  // Function to generate and display the resume (non-editable)
  function generateResume(data: {
    name: string;
    email: string;
    degree: string;
    school: string;
    gradYear: number;
    jobTitle: string;
    company: string;
    years: number;
    skills: string[];
  }): void {
    resumeContent.innerHTML = `
      <h3>${data.name}</h3>
      <p>Email: ${data.email}</p>
      <h4>Education</h4>
      <p>${data.degree} from ${data.school} (Class of ${data.gradYear})</p>
      <h4>Work Experience</h4>
      <p>${data.jobTitle} at ${data.company} (${data.years} years)</p>
      <h4>Skills</h4>
      <ul>
          ${data.skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    `;
  }

  // Function to copy link to clipboard
  function copyToClipboard(text: string): void {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  // Download resume as PDF
  downloadBtn.addEventListener("click", function () {
    const resumeElement = document.getElementById("resume") as HTMLElement;
    const opt = {
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

