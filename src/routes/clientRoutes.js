// src/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// נתיב ליצירת לקוח חדש (POST request)
router.post('/', clientController.addClient);

// נתיב לקבלת כל הלקוחות (GET request) - השורה הזו עודכנה
router.get('/', clientController.getClients);

router.get('/:id', clientController.getClientById);


router.put('/:id', clientController.updateClient);
    
module.exports = router;