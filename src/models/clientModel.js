// src/models/clientModel.js


const base = require('../config/airtableConfig');
const db = require('../config/firebaseConfig').db;


const createClient = async (clientData) => {
  try {
    // Use the correct table name: 'New Clients'
    const records = await base('New Clients').create([{ fields: clientData }]);
    const newRecord = records[0];
    return { id: newRecord.getId(), ...newRecord.fields };
  } catch (error) {
    console.error('Error creating client in Airtable:', error);
    throw new Error('Error creating client in Airtable');
  }
};

const getAllClients = async () => {
  try {
    // Use the correct table name: 'New Clients'
    const records = await base('New Clients').select().all();
    const clients = records.map(record => ({
      id: record.id,
      ...record.fields
    }));
    return clients;
  } catch (error) {
    console.error('Error fetching clients from Airtable:', error);
    throw new Error('Error fetching clients from Airtable');
  }
};

const createClientOnFirebase = async (name, phone, status) => {
    try {
        // 2. שימוש ישיר באובייקט ה-db המיובא
        const docRef = await db.collection("Users").add({
            Name: name,
            Phone: phone,
            Status: status,
        });

        console.log("Document written with ID: ", docRef.id);
        return docRef.id;

    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Error adding document");
    }
};

const getClientById = async (clientId) => {
  const docRef = db.collection('Users').doc(clientId);
  const doc = await docRef.get();

  if (doc.exists) {
    console.log('Document data:', doc.data());
    return { id: doc.id, ...doc.data() };
  } else {
    console.log('No such document! Creating a new one...');
    // You can add initial data to the new document here if you want
    await docRef.set({
      createdAt: new Date().toISOString(),
    });
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() };
  }
};

const updateClientById = async (clientId, updatedData) => {
  try {
    const docRef = db.collection('Users').doc(clientId);
    await docRef.update(updatedData);
    console.log(`Document with ID: ${clientId} has been updated.`);
    return { success: true, message: 'Document updated successfully.' };
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Error updating document in Firestore");
  }
};

const updateClientInAirtable = async (recordId, updatedData) => {
  try {
    const updatedRecords = await base('New Clients').update([
      {
        id: recordId,
        fields: updatedData,
      },
    ]);
    const updatedRecord = updatedRecords[0];
    console.log(`Record with ID: ${recordId} has been updated in Airtable.`);
    return { id: updatedRecord.getId(), ...updatedRecord.fields };
  } catch (error) {
    console.error('Error updating client in Airtable:', error);
    throw new Error('Error updating client in Airtable');
  }
};

module.exports = {
  createClient,
  createClientOnFirebase,
  updateClientInAirtable,
  updateClientById,
  getAllClients,
  getClientById,
};