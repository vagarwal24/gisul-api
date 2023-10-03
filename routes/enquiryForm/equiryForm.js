import express from 'express'
import { createEnquiry, getAllEnquiry } from '../../controllers/enquiryForm/enquiryForm.js'
const router = express.Router()

router.post('/enquiry/enquiry-form-insert', createEnquiry)
router.get('/enquiry/get-all-enquiry-form', getAllEnquiry)
// router.get('/content-single/:contentId', getSingleContent)
// router.put('/content-update/:contentId', updateContent)
// router.delete('/content-delete/:contentId', deleteContent)
export default router
