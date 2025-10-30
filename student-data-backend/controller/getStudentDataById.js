const StudentEntry = require("../models/studentEntry");
const Marks = require("../models/studentMark");

async function getStudentById(req, res) {
    try {
        const studentId = req.params.id;
        console.log("student Id", studentId);
        const student = await StudentEntry.findByPk(studentId);
        console.log("is student id exist", student);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

         // Check if marks exist
        const marks = await Marks.findOne({ where: { student_id: student.id } });
        const studentData = {
            ...student.dataValues,
            hasMarks: !!marks
        };

        return res.status(200).json({ data: studentData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch student" });
    }
}

module.exports = { getStudentById };
