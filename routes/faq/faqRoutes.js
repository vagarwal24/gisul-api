import express from 'express'
import { createFAQ, deleteFAQ, faq_details, getAllFAQs, updateFAQ } from '../../controllers/faq/faqController.js'


const router = express.Router()

// -----------------
// FAQ Routes
// -----------------

router.post('/faq/faq-insert', createFAQ) //Create-FAQ Routes
router.get('/faq/get-all-faq', getAllFAQs) //Get-All-FAQ Routes
router.get('/faq-single/:faqId', faq_details) //Single-FAQ Routes
router.put('/faq-update/:faqId', updateFAQ) //Update-FAQ Routes
router.delete('/faq-delete/:faqId', deleteFAQ) //Delete-FAQ Routes
export default router