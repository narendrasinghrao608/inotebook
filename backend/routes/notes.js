const express=require('express')
const router=express.Router()
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
// Route 1:get all the notes details:GET "/api/auth/getiser."  login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal error occured");
    }
})
// Route 2:Add a new Note using:POST "/api/auth/addnote."  login required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3}),
    body("discription", "Enter discription must be atleast 5 character ").isLength({
      min: 5,
    }),
],async (req,res)=>{
        try {
            
            const {title,description,tag}=req.body
            // if there are errors, return bad request and the  error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note=new Note({
                title,description,tag,user:req.user.id
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal error occured");
        }
        const savenote=await note.save()
    res.json(savenote)
})
// Route 2:update existing note using:Put "/api/auth/updatenotenote."  login required
router.put('/updatenote',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    //Create a newnote object
    const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    //Find the note to be update and update it
    const note=Note.findById(req.params.id);
    if(!node){res.status(404).send("Not Found")}
    if(node.user.Tostring()!==req.user.id){}
})
module.exports=router