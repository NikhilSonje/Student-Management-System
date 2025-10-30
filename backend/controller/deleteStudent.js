const studentEntry = require("../models/studentEntry");

async function deleteStudentData(req, res) {
    const inputBody = req.body;
    console.log("Input Body:", inputBody);

    try {
        // get id for delete records
        const id = req.params.id;
        console.log("student id for delete records", id)
        const student = await studentEntry.findByPk(id);
        console.log("is student found ", student)

        if (!student) {
            return res.status(404).json({ message: `${id} id student not found` });
        }
        // delete all records
        await student.destroy();

        return res.status(200).json({ message: 'Student data deleted successfully', data: student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete student data" });
    }
}

module.exports = { deleteStudentData };