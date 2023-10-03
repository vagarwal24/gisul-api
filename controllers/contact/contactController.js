import Contact from "../../models/contactus/contactModel.js";

// -----------------------
// Create a Contact
// -----------------------

export const createContact = async (req, res) => {
  const { first_name, last_name, email, contact_number, message } = req.body;

  if (!first_name || !last_name || !email || !contact_number || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    
    const contact = new Contact({
      first_name,
      last_name,
      email,
      contact_number,
      message
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new contact.' });
  }
}



// --------------------------------
// Get All Contact
// ----------------------------
export const getAllContact = async (req, res)=>{
    try {
      const contact = await Contact.find().lean()
      res.status(200).json(contact)
    } catch (error) {
      res.status(400).json(error)
    }
  }


// -----------------------------
// Single Contact
// ----------------------------
export const contactsingledetails = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.contactId);
      // console.log('-----check', contact)
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found.' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the Contact.' });
    }
  };

// ---------------------------------
// Update a Contact
// ---------------------------------
// export const updateContact = async (req, res) => {
//     try {
//       const contact ={
//         first_name : req.body.first_name,
//         last_name  : req.body.last_name,
//         email      : req.body.email,
//         contact_number : req.body.contact_number,
//         message    : req.body.message
//       }
//       const updatedProduct = await Contact.findByIdAndUpdate(
//           { _id: req.params.updateId},
//           contact
//       )
//       res.status(200).json(contact)
//   } catch (error) {
//        console.log(error);
//       res.send({message: error})
//   }
//   }


// -------------------------------
// Delete a Contact
// -------------------------------
export const deleteContact = async (req, res) => {
    const { deleteId } = req.params;
  
    try {
      const deletedcontact = await Contact.findByIdAndDelete(deleteId);
      if (!deletedcontact) {
        return res.status(404).json({ error: 'contact not found.' });
      }
      res.json({ message: 'contact deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the contact.' });
    }
  };
  