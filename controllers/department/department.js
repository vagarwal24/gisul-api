import Department from "../../models/department/department.js";

// -------------------------
// Create a new category
// -------------------------
export const createDepartment = async (req, res) => {
    const { type, name } = req.body;
    console.log('Request body:', req.body);
    try {


        if (!type || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const lowercaseType = type.toLowerCase();

        if (lowercaseType === 'job') {
            const newDepartment = new Department({ type: lowercaseType, name });
            const savedDepartment = await newDepartment.save();
            console.log('Saved department:', savedDepartment);
            res.status(201).json(savedDepartment);
        } else {
            res.status(400).json({ error: 'Invalid department type' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create department' });
    }
}



// -----------------------
// Get all categories
// -----------------------
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// ----------------------------
// Get a category by ID
// ----------------------------
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// --------------------------
// Update a category
// --------------------------
export const updateDepartment = async (req, res) => {
    const departmentId = req.params.departmentId;
    try {
        const { type, name } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(
            departmentId,
            { type, name },
            { new: true } // Return the updated document
        );

        if (!updatedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json(updatedDepartment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




// ----------------------
// Delete a category
// -----------------------
export const deletedDepartment = async (req, res) => {
  const departmentId = req.params.departmentId;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    console.log('---check', deletedDepartment);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(204).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete department' });
  }
};
