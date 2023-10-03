import express from 'express'
import { createJob, deleteJob, getAllJobs, getSingleJob, updateJob } from '../../controllers/jobs/jobController.js'

const router = express.Router()

// ----------------
// Private Route
// ------------------

router.post('/job/jobs-insert', createJob)  //Create-Job Routes
router.get('/job/get-all-job',getAllJobs)   //Get-All-Job Routes
router.get('/job-single/:jobId',getSingleJob) //Single-Job Routes
router.put('/job-update/:jobId', updateJob)  //Update-Job Routes
router.delete('/job-delete/:jobId',deleteJob) //Delete-Job Routes


export default router