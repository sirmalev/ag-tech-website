// src/controllers/clientController.js

const clientModel = require('../models/clientModel');

/**
 * פונקציה שמטפלת בלוגיקה של יצירת לקוח
 */
// src/controllers/clientController.js

const addClient = async (req, res) => {
  try {
    const clientData = {
      "Name": req.body.name,     // Change "שם" to "Name"
      "Phone": req.body.phone,   // Change "טלפון" to "Phone"
      "Status": req.body.status           // Change "סטטוס" to "Status"
    };
    const newClient = await clientModel.createClient(clientData);
    res.status(201).send(newClient);
  } catch (error) {
    res.status(500).send({ message: "שגיאה ביצירת לקוח חדש", error: error.message });
  }
};

const createClientOnFirebase = async (req, res) => {
  const { name, phone, status } = req.body;

  try {
    const clientId = await clientModel.createClientOnFirebase(name, phone, status);
    res.status(201).send({ id: clientId });
  } catch (error) {
    res.status(500).send({ message: "שגיאה ביצירת לקוח חדש", error: error.message });
  }
};
// src/controllers/clientController.js
const addClientToAllServices = async (req, res) => {
  try {
    const { name, phone, status } = req.body;
    const clientData = {
      "Name": name,
      "Phone": phone,
      "Status": status
    };

    await clientModel.createClient(clientData);
    const clientId = await clientModel.createClientOnFirebase( name, phone, status );

    res.status(201).json({ id: clientId });

  } catch (error) {
    // 👇 --- הדבר הכי חשוב כרגע --- 👇
    console.error("💥 Server Crash Details:", error); 
    res.status(500).send({ message: "שגיאה ביצירת לקוח", error: error.message });
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  console.log("Requested client status:", {status});

  try {

    if (status === "New") {
      const clientData = {
        "Status": "In progress"
      };
      await clientModel.updateClientInAirtable(id, clientData);
    }
    ;

    const client = await clientModel.getClientById(id);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).send({ message: "שגיאה במשיכת הלקוח", error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params; // לקיחת ה-ID מהנתיב
    const clientData = req.body; // לקיחת כל המידע לעדכון מה-body

    // קריאה לפונקציה במודל עם ה-ID והמידע החדש
    const result = await clientModel.updateClientById(id, clientData);
    
    // שליחת תשובה שהעדכון הצליח
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: "שגיאה בעדכון הלקוח", error: error.message });
  }
};

/**
 * פונקציה שמטפלת בלוגיקה של קבלת כל הלקוחות
 */
const getClients = async (req, res) => {
  try {
    // 1. קריאה לפונקציה המתאימה במודל, שמביאה את הנתונים
    const allClients = await clientModel.getAllClients();
    
    // 2. שליחת הנתונים חזרה לדפדפן כתשובת JSON
    res.status(200).json(allClients);
  } catch (error) {
    res.status(500).send({ message: "שגיאה במשיכת הלקוחות", error: error.message });
  }
};


module.exports = {
  addClient,
  createClientOnFirebase,
  addClientToAllServices,
  updateClient,
  getClients,
  getClientById,
};