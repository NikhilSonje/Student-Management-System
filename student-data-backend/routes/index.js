const express = require("express");
const router = express.Router();
const config = require("../config/config.json");
const getUrlPrefix = config.app.prefix;

const createStudentController = require("../controller/addStudent");
const getStudentByIdController = require("../controller/getStudentDataById");
const getAllStudentController = require("../controller/getAllStudent");
const updateStudentController = require("../controller/updateStudent");
const deleteStudentController = require("../controller/deleteStudent");
const addStudentMarksController = require("../controller/addStudentMarks"); 
const getStudentMarksController = require("../controller/getStudentMarks"); 

router.get(getUrlPrefix + '/ping', (req, res) => {
    res.status(200).send("pong");
})

router.post(getUrlPrefix + '/createNewStudent', (req, res) => {
    createStudentController.createNewStudent(req, res);
})

router.get(getUrlPrefix + '/getStudentById/:id', (req, res) => {
    getStudentByIdController.getStudentById(req, res);
})

router.get(getUrlPrefix + '/getAllStudent', (req, res) => {
    getAllStudentController.getAllStudent(req, res);
})

router.put(getUrlPrefix + '/updateStudentData/:id', (req, res) => {
    updateStudentController.updateStudentData(req, res);
})

router.delete(getUrlPrefix + '/deleteStudentData/:id', (req, res) => {
    deleteStudentController.deleteStudentData(req, res);
})

router.post(getUrlPrefix + '/addStudentMarks/:id', (req, res) => {
    addStudentMarksController.addStudentMarks(req, res);
})

router.get(getUrlPrefix + '/getStudentMarks/:id', (req, res) => {
    getStudentMarksController.getStudentMarks(req, res);
})

module.exports = router;