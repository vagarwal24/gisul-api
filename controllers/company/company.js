import Company from "../../models/company/company.js";

// ------------------------
// Create a Company Logo
// ------------------------
export const createLogo = async (req, res) => {
  try {
    const { path: imagePath } = req.file;
    if (!imagePath) {
      return res.status(400).json({ error: "image is required" });
    }

    const newCompanyLogo = new Company({
      image: imagePath,
    });

    const savedCompany = await newCompanyLogo.save();

    res
      .status(201)
      .json({ message: "Logo created successfully", company: savedCompany });
  } catch (error) {
    console.error(error); // Log the specific error for debugging purposes
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ---------------------------
// Get all Company Logo
// ---------------------------
export const getAllLogos = async (req, res) => {
    try {
      const logos = await Company.find();
      res.status(200).json(logos);
    } catch (error) {
      console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
  // ----------------------------
  // Get Single Company Logo
  // ----------------------------
  export const getSingleLogo = async (req, res) => {
    const logoId = req.params.id;
    try {
      const logo = await Company.findById(logoId);
      if (!logo) {
        return res.status(404).json({ error: "Logo not found" });
      }
      res.status(200).json({ logo }); // Wrap logo in an object to provide a clear response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
  
  // ----------------------------
  // Delete Company Logo
  // ----------------------------
  export const deleteLogo = async (req, res) => {
    const logoId = req.params.id; // Access the 'id' property
    console.log('Deleting logo with ID:', logoId);
    try {
  
      const deletedLogo = await Company.findByIdAndDelete(logoId);
  
      if (!deletedLogo) {
        return res.status(404).json({ error: "Logo not found" });
      }
  
      res.status(200).json({ message: "Logo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
};
  