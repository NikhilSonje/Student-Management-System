const StudentMarksData = require('../models/studentMark');
const addStudentMarksSchema = require("../validation/validationSchema").addStudentMarksSchema;
const { validateCheck } = require("../services/validation");

async function addStudentMarks(req, res) {
    const inputBody = req.body;
    console.log("Input Body:", inputBody);

    // body schema validation
    const isValidate = await validateCheck(addStudentMarksSchema, inputBody);
    console.log("isvalidate", isValidate);

    if (!isValidate.flag) {
        return res.status(400).send({ status: "400", message: isValidate.error });
    }

    try {
        const studentId = req.params.id;
        const { math, science, gk, marathi, english, hindi } = req.body;
        console.log(req.body);

        // Check if marks already exist for this student id
        const existingMarks = await StudentMarksData.findOne({ where: { student_id: studentId } });
        console.log("is marks exist for student id", existingMarks);

        if (existingMarks) {
            return res.status(400).json({ message: 'Marks already added for this student' });
        }

        // Create new marks entry for student
        const newMarks = await StudentMarksData.create({
            student_id: studentId,
            math,
            science,
            gk,
            marathi,
            english,
            hindi
        });
        console.log("new marks added", newMarks)

        return res.status(201).json({ message: 'Marks added successfully', data: newMarks });
    } catch (error) {
        console.error("catchhhhh", error);
        return res.status(500).json({ message: 'Failed to add marks' });
    }
}

module.exports = { addStudentMarks }