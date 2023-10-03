import Department from "../../models/department/department.js";
import Job from "../../models/jobs/jobModel.js";

// -----------------------
// Create a Job
// -----------------------

export const createJob = async (req, res) => {
  const {
    job_title,
    job_type,
    experience,
    location: { state, city },
    job_profile,
    job_responsibilities,
    requirements,
    job_code,
    posted_date,
    department
  } = req.body;

  if (
    !job_title ||
    !job_type ||
    !experience ||
    !state ||
    !city ||
    !job_profile ||
    !job_responsibilities ||
    !requirements ||
    !job_code ||
    !posted_date
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingJob = await Job.findOne({ job_code });

    if (existingJob) {
      return res.status(409).json({ error: "Job with the same job code already exists." });
    }
    
    let departmentObj;
    if (department.length === 24) {
      departmentObj = await Department.findById(department);
    } else {
      departmentObj = await Department.findOne({ name: department });

      if (!departmentObj) {
        departmentObj = new Department({ name: department });
        await departmentObj.save();
      }
    }

    if (!departmentObj) {
      return res.status(404).json({ error: 'Department not found.' });
    }

    const job = new Job({
      job_title,
      job_type,
      experience,
      location: { state, city },
      job_profile,
      job_responsibilities,
      requirements,
      job_code,
      posted_date,
      department: departmentObj._id,  // Use departmentObj._id instead of department._id
      department_name: departmentObj.name,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new job." });
  }
};


// --------------------------------
// Get All Jobs
// ----------------------------

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().lean();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the jobs." });
  }
};

// -----------------------------
// Get Single Job
// ----------------------------

export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the job." });
  }
};

// ---------------------------------
// Update a Job
// ---------------------------------

export const updateJob = async (req, res) => {
  const jobId = req.params.jobId;

  const {
    job_title,
    job_type,
    experience,
    state,
    city,
    job_profile,
    job_responsibilities,
    requirements,
    job_code,
    posted_date,
    department
  } = req.body;

  // Validation and error handling
  if (
    !job_title ||
    !job_type ||
    !experience ||
    !state ||
    !city ||
    !job_profile ||
    !job_responsibilities ||
    !requirements ||
    !job_code ||
    !posted_date
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingJob = await Job.findOne({ job_code, _id: { $ne: jobId } });

    if (existingJob) {
      return res.status(409).json({ error: "Job with the same job code already exists." });
    }

    let departmentObj;
    if (department.length === 24) {
      departmentObj = await Department.findById(department);
    } else {
      departmentObj = await Department.findOne({ name: department });

      if (!departmentObj) {
        departmentObj = new Department({ name: department });
        await departmentObj.save();
      }
    }

    if (!departmentObj) {
      return res.status(404).json({ error: 'Department not found.' });
    }

    const updatedJob = {
      job_title,
      job_type,
      experience,
      location: { state, city },
      job_profile,
      job_responsibilities,
      requirements,
      job_code,
      posted_date,
      department: departmentObj._id,
      department_name: departmentObj.name,
    };

    console.log("Updating job in the database...");

    const result = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });

    if (!result) {
      console.log("Job not found for update.");
      return res.status(404).json({ error: 'Job not found.' });
    }

    console.log("Job updated successfully:", result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the job." });
  }
};



// -------------------------------
// Delete a Job
// -------------------------------

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found." });
    }

    res.json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the job." });
  }
};
