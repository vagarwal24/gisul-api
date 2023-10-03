import express from 'express'
import dotenv from  'dotenv'
import cors from 'cors'
import connectDB from './db/connectdb.js'
import blogRouter from './routes/blog/blogRoutes.js'
import courseRouter from './routes/course/courseRoutes.js'
import jobRouter from './routes/jobs/jobRouter.js'
import contactRouter from './routes/contact/contactRouter.js'
import faqRouter from './routes/faq/faqRoutes.js'
import enquiryRouter from './routes/enquiryForm/equiryForm.js'
import testimonialRouter from './routes/testimonial/testimonial.js'
import adminRouter from './routes/admin/admin.js'
import categoryRouter from './routes/category/category.js'
import webinarRouter from './routes/webinar/webinar.js'
import webRouter from './routes/web.js'
import logoRouter from './routes/company/company.js'
import departmentRouter from './routes/department/department.js'


const app = express()
dotenv.config()

// --------------------
// Process Env
// --------------------
const PORT = process.env.PORT || 5000;
const DB_CONNECT = process.env.DB_CONNECT

// --------------------------------------------------------
// Database Connection
// --------------------------------------------------------

connectDB(DB_CONNECT);



// Use express.static to serve static files from the "public" folder
app.use(express.static('public'));
// app.use(express.static('files'))



// ----------------------------
// CORS Policy Error Handlers
// ----------------------------
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use('/files/blogs', express.static('public/uploads/blogs'));
app.use('/files/courses', express.static('public/uploads/courses'));
app.use('/files/testimonial', express.static('public/uploads/testimonial'));
app.use('/files/webinar', express.static('public/uploads/webinar'));
app.use('/files/logo', express.static('public/uploads/logo'));
app.use('/files/category', express.static('public/uploads/category'));



// -------------------------------
//  Routes
// -------------------------------
// blogs
app.use('/api/gisul', blogRouter)

// faq
app.use('/api/gisul', faqRouter)

// courses
app.use('/api/gisul', courseRouter)

// job
app.use('/api/gisul', jobRouter)

// web
app.use('/api/gisul', webRouter)

// contaact
app.use('/api/gisul', contactRouter)

// content
app.use('/api/gisul', enquiryRouter)

// department
app.use('/api/gisul', departmentRouter)

// admin
app.use('/api/gisul', adminRouter);


// testimonial
app.use('/api/gisul', testimonialRouter)

// category
app.use('/api/gisul', categoryRouter)

// webinar
app.use('/api/gisul', webinarRouter)

// company-logo
app.use('/api/gisul', logoRouter)

app.listen(PORT, ()=> {
    console.log(`Server is connected successfully ${PORT}`)
})
