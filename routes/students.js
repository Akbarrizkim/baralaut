const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET ALL STUDENT INFORMATION
router.get('/', async (req, res) => {
    try{
        const studentData = await Student.find();
        res.render('pages/table', {student: studentData});
    }catch{
        res.json({ message: error });
    }
});

router.get('/input', async (req, res) => {
    try{
        res.render('pages/input');
        // res.json(studentData);
    }catch(err){
        res.status(400).json({message: err});
    }
});

// SUBMIT NEW STUDENT INFORMATION
router.post('/input', async (req, res) => {
    const student = new Student({
        nim: req.body.nim,
        nama: req.body.nama,
        umur: req.body.umur,
        fakultas: req.body.fakultas,
        jurusan: req.body.jurusan,
        alamat: req.body.alamat
    });
    try{
    const savedStudent = await student.save();
    res.redirect('/students');
    }catch(err){
        res.json({ message: error });
    }
});

// SPECIFIC STUDENT
// router.get('/:studentId', async (req, res) => {
//     try{
//     const student = await Student.findById(req.params.studentId);
//     res.json(student);
//     }catch(err){
//         res.json({ message: err });
//     }
// });

// DELETE STUDENT INFORMATION
router.delete('/:studentId', async (req, res) => {
    try{
        const removedStudent = await Student.deleteOne({_id: req.params.studentId});
        res.redirect('/students');
    }catch(err){
        res.status(500).json({ message: err });
    }
});

// GO TO EDIT PAGE
router.get('/edit/:studentId', async (req, res) => {
    try{
        const studentData = await Student.findById(req.params.studentId);
        res.render('pages/edit', {data: studentData});
        // res.json(studentData);
    }catch(err){
        res.status(400).json({message: err});
    }
});

// UPDATE DATA STUDENT
router.put('/:studentId', async (req, res) => {
    try{
        const updatedstudent = await Student.updateOne(
            {_id: req.params.studentId},
            { $set: {
                nim: req.body.nim,
                nama: req.body.nama,
                umur: req.body.umur,
                fakultas: req.body.fakultas,
                jurusan: req.body.jurusan,
                alamat: req.body.alamat}}
        );
        res.redirect('/students');
    }catch(err){
        res.json({ message: err });
    }
});

module.exports = router;