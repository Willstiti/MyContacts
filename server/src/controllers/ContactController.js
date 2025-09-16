const Contact = require("../Model/Contact");
const contactService = require("../services/ContactService");

const getUserContact = async (req, res) => {
    try {
        const contacts = await contactService.getAllContact(req.user._id);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ failed: "No contacts found for this user" });
    }
};

const createContact = async(req, res)=>{
    const {firstName, lastName, phoneNumber } = req.body;
    
    try{
        await contactService.saveContact(firstName, lastName, phoneNumber, req.user._id)
        res.status(201).json({ 'success' : 'New contact has been created'});
    } catch (err){
        res.status(500).json({ 'Error message' : err.message});
    }  
}

const editContact = async(req, res)=>{
    const contactId = req.params.id;
    try{
        await contactService.updateContact(contactId, req.body);
        res.status(200).json({ 'success' : 'Contact has been updated'});
    } catch (err){
        res.status(500).json({ 'Error message' : err.message});
    }  
}

const deleteContact = async(req, res)=>{
    const contactId = req.params.id;
    try{
        await contactService.deleteContact(contactId);
        res.status(201).json({ 'success' : 'Contact has been deleted'});
    } catch (err){
        res.status(500).json({ 'Error message' : err.message});
    }  
}

module.exports = { getUserContact, createContact, editContact, deleteContact };