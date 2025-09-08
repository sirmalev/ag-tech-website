<div align="center">
  
# AG Technology - Company Website & Blog 🚀

Source code for the official website of AG Technology, a company specializing in automation and AI solutions for businesses. The site serves as a marketing tool, contact point, and content platform.
<br/>

<a href="https://aloutomation.guru/" target="_blank" style="margin-left: 10px;"><strong>Visit the live site »</strong></a>


<br/>

<!-- Replace [YOUR_USERNAME]/[YOUR_REPOSITORY] with your GitHub username and repository name -->
![GitHub issues](https://img.shields.io/github/issues/sirmalev/ag-tech-website?style=for-the-badge&color=brightgreen)![GitHub forks](https://img.shields.io/github/forks/sirmalev/ag-tech-website?style=for-the-badge&color=blue)![GitHub stars](https://img.shields.io/github/stars/sirmalev/ag-tech-website?style=for-the-badge&color=yellow)

</div>

---

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-setup--installation">Setup & Installation</a> •
  <a href="#-contact">Contact</a>
</p>

---

## 📖 Overview
This project is the website for AG Technology. It includes:
- **Frontend:** A responsive static site built with HTML, CSS, and vanilla JavaScript.
- **Backend:** A Node.js server using the Firebase Admin SDK to connect to a Firestore database. The server is responsible for receiving and saving submissions from the contact form.

The site showcases the company's services, including an interactive savings calculator, and features a blog with professional articles.

---

## ✨ Key Features
*   **Responsive Company Website:** Showcases company services, work process, and value proposition.
*   **Blog System:** Articles are managed as JavaScript modules, allowing for easy content addition and management.
*   **Savings Calculator (ROI):** An interactive tool for potential clients to estimate savings from automation.
*   **Contact Form:** A functional form that sends data to the backend and stores it securely in Firestore.
*   **Cookie Consent Management:** A banner for managing cookie consent according to regulations.

---

## 🛠️ Tech Stack
This project was built using the following technologies:

**Frontend:**
- HTML5
- CSS3
- JavaScript (ES6+)

**Backend:**
- Node.js
- Firebase Admin SDK
- Firestore (NoSQL Database)

---

## ⚙️ Setup & Installation
To run this project locally, you will need Node.js and a Firebase project.

### Prerequisites (Firebase)
1.  Create a new project in the Firebase Console.
2.  In your new project, enable the **Firestore Database**.
3.  In your project settings (`Project settings` -> `Service accounts`), click **"Generate new private key"**. This will download a JSON file. Save it for the next step.

### Local Installation
1.  **Clone the repository**
    ```bash
    # Replace with your repository URL
    git clone https://github.com/sirmalev/ag-tech-website.git
    ```
2.  **Navigate to the project directory**
    ```bash
    cd ag-tech-website
    ```
3.  **Install dependencies**
    ```bash
    npm install
    ```
4.  **Set up environment variables**
    a. Create a file named `.env` in the project's root directory.
    b. Open the JSON file you downloaded from Firebase.
    c. Convert the entire content of the JSON file into a single Base64 encoded string. You can use an online tool or the following terminal command:
       ```bash
       # Replace 'path/to/your/serviceAccountKey.json' with the path to your file
       cat path/to/your/serviceAccountKey.json | base64
       ```
    d. Add the resulting string to your `.env` file like this:
       ```
       FIREBASE_SERVICE_ACCOUNT_BASE64="<Your-Base64-String-Here>"
       ```

5.  **Run the server**
    (Assuming the server entry file is `src/app.js` or similar)
    ```bash
    node src/app.js 
    ```
    *The server will run and listen for submissions from the form.*

6.  **Run the frontend**
    To view the site, you can use the Live Server extension in VS Code on the `public/index.html` file, or run a simple static server from your terminal:
    ```bash
    npx serve public
    ```

---

## 📫 Contact


<a href="https://il.linkedin.com/in/alon-malev" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>

<a href="mailto:sir.alonmalev@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"></a>
