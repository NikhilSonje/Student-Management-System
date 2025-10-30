const StudentMarksData = require('../models/studentMark');

async function getStudentMarks(req, res) {
    try {
        const studentId = req.params.id;

        // get the student marks on student id
        const marks = await StudentMarksData.findOne({ where: { student_id: studentId } });
        console.log("student marks", marks);
        if (!marks) {
            return res.status(404).json({ message: `Marks not found for student id ${studentId}` });
        }

        return res.status(200).json(marks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch marks' });
    }
}

module.exports = { getStudentMarks };