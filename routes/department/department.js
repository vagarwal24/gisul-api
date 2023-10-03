import express from 'express'
import { createDepartment, deletedDepartment, getAllDepartments, getDepartmentById, updateDepartment } from '../../controllers/department/department.js'

const router = express.Router()

router.post('/department/department-insert', createDepartment)
router.get('/department/get-all-department', getAllDepartments)
router.get('/department-single/:contentId', getDepartmentById)
router.put('/department-update/:departmentId', updateDepartment)
router.delete('/department-delete/:departmentId', deletedDepartment)
export default router
