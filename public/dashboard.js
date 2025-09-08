import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getFirestore, collection, addDoc, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { auth } from './auth.js'; // Import the auth instance from auth.js

const db = getFirestore();
const logoutBtn = document.getElementById('logout-btn');
const addClientBtn = document.getElementById('add-client-btn');
const addClientPopup = document.getElementById('addClientPopup');
const closePopupBtn = document.querySelector('.popup .close');
const addClientForm = document.getElementById('addClientForm');

// Open popup when "Add Client" button is clicked
if (addClientBtn) {
    addClientBtn.addEventListener('click', () => {
        addClientPopup.style.display = 'block';
    });
}

// Close popup when the close button (x) is clicked
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
        addClientPopup.style.display = 'none';
    });
}

// Close popup when clicking outside of the popup content
window.addEventListener('click', (event) => {
    if (event.target == addClientPopup) {
        addClientPopup.style.display = 'none';
    }
});

// Handle form submission
if (addClientForm) {
    addClientForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('clientName').value;
        const phone = document.getElementById('clientPhone').value;
        const status = "In progress"; // Default status for new clients

        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, status }),
            });

            if (response.ok) {
                const data = await response.json();
                const clientId = data.id;
                addClientPopup.style.display = 'none'; // Close the popup
                addClientForm.reset(); // Reset the form fields
                fetchClientData(); // Refresh the client list
                // Optionally, open the new client's details page
                // Encode the name and phone to handle special characters in the URL
                const encodedName = encodeURIComponent(name);
                const encodedPhone = encodeURIComponent(phone);
                // window.open(`/client-details.html?id=${clientId}&name=${encodedName}&phone=${encodedPhone}`, '_blank');
            } else {
                alert('שגיאה בהוספת הלקוח. אנא נסה שוב.');
            }
        } catch (error) {
            console.error('Error adding new client:', error);
            alert('שגיאה בהוספת הלקוח. אנא נסה שוב.');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = '/login'; // Redirect to login page after logout
        } catch (error) {
            console.error("Error during logout:", error);
            alert("התנתקות נכשלה. אנא נסו שוב.");
        }
    });
}

// Example: Fetch client data (replace with actual API calls)
// In your dashboard.js file
// In your dashboard.js file
async function fetchClientData() {
    try {
        // חשוב: אני מניח שלכל לקוח שחוזר מה-API יש מזהה ייחודי.
        // בדרך כלל זה נקרא `_id` (מ-MongoDB) או פשוט `id`.
        // אני אשתמש ב- client.id בדוגמה.
        const response = await fetch('/api/clients');
        const clients = await response.json();
        const clientsListDiv = document.getElementById('clients-list');

        if (clientsListDiv) {
            clientsListDiv.innerHTML = '';
            clients.forEach(client => {
                const clientDiv = document.createElement('div');
                clientDiv.className = 'client-card';

                const encodedName = encodeURIComponent(client.Name);
                const encodedPhone = encodeURIComponent(client.Phone);
                const encodedStatus = encodeURIComponent(client.Status);

                // --- כאן השינוי המרכזי ---
                // אנחנו יוצרים לינק דינמי עם ה-ID של הלקוח
                clientDiv.innerHTML = `
                    <div class="client-info">
                        <h3>${client.Name}</h3>
                        <p>טלפון: ${client.Phone}</p>
                        <p>סטטוס: ${client.Status}</p>
                    </div>
                    <div class="client-actions">
                        <button data-client-id="${client.id}" class="btn btn-primary open-details-btn">פתח איפיון לקוח</button>
                    </div>
                `;

                clientsListDiv.appendChild(clientDiv);

                const openDetailsBtn = clientDiv.querySelector('.open-details-btn');
                openDetailsBtn.addEventListener('click', async (e) => {
                // השגנו את ה-ID מהכפתור
                const clientId = e.target.getAttribute('data-client-id');
                
                try {
                    // בצענו קריאה לשרת כדי לקבל את כל נתוני הלקוח
                    const response = await fetch(`/api/clients/${clientId}?status=${encodedStatus}`);
                    const clientData = await response.json();
                    
                    console.log("התקבלו נתוני הלקוח:", clientData);

                    // --- כאן מתחילה הלוגיקה החדשה ---

                    let urlToOpen;
                    console.log("מספר מפתחות באובייקט:", Object.keys(clientData))
                    // נבדוק כמה שדות (מפתחות) יש באובייקט clientData
                    if (Object.keys(clientData).length > 2) {
                        // אם יש יותר מ-2 שדות, נעביר את כל האובייקט
                        console.log("מעביר את כל האובייקט...");

                        // 1. הופכים את האובייקט למחרוזת JSON
                        const dataString = JSON.stringify(clientData);
                        // 2. מקודדים את המחרוזת כדי שתהיה בטוחה ל-URL
                        const encodedData = encodeURIComponent(dataString);
                        
                        sessionStorage.setItem('currentClientData', JSON.stringify(clientData));

                        // 3. בונים את הכתובת עם פרמטר אחד בשם 'data'
                        urlToOpen = `/client-details.html?id=${clientData.id}`;

                    } else {
                        // אם יש 2 שדות או פחות, נשתמש בדרך הישנה
                        console.log("מעביר פרמטרים בודדים...");
                        sessionStorage.removeItem('currentClientData');
                        urlToOpen = `/client-details.html?id=${clientData.id}&name=${encodedName}&phone=${encodedPhone}&status=${encodedStatus}`;
                    }
                    
                    // פתיחת החלון החדש עם הכתובת שבנינו
                    window.open(urlToOpen, '_blank');

                    return clientData;

                } catch (error) {
                    console.error("Error fetching client data:", error);
                    alert("אירעה שגיאה בקבלת נתוני הלקוח. נסו שוב.");
                }
            });
            });
        }
    } catch (error) {
        console.error("Error fetching client data:", error);
        const clientsListDiv = document.getElementById('clients-list');
        if (clientsListDiv) {
            clientsListDiv.innerHTML = '<p>שגיאה בטעינת נתוני לקוחות.</p>';
        }
    }
}

// Check auth state and load data
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, fetch data
        console.log("User is signed in:", user.email);
        fetchClientData();
    } else {
        // User is signed out, redirect to login
        window.location.href = '/login';
    }
});