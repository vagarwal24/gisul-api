import express from 'express'
import { contactsingledetails, createContact, deleteContact, getAllContact } from '../../controllers/contact/contactController.js'


const router = express.Router()

// ----------------
// Private Route
// ------------------

router.post('/contact/cotact-insert',createContact) //Insert Contact Routes
router.get('/contact/get-all-contact',getAllContact) //Get-All-Contacts Routes
router.get('/contact-single/:contactId',contactsingledetails) //Single-Contact Routes
// router.put('/contact/:updateId',updateContact)
router.delete('/contact-delete/:deleteId',deleteContact) //Delete Contact Routes



export default router