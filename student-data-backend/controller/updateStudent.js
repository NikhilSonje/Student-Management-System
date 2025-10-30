const studentEntry = require("../models/studentEntry");
const updateStudentSchema = require("../validation/validationSchema").updateStudentSchema;
const { validateCheck } = require("../services/validation");

async function updateStudentData(req, res) {
    const inputBody = req.body;
    console.log("Input Body:", inputBody);

    // body schema validation
    const isValidate = await validateCheck(updateStudentSchema, inputBody);
    console.log("isvalidate", isValidate);

    if (!isValidate.flag) {
        return res.status(400).send({ status: "400", message: isValidate.error });
    }

    try {
        // check if user exists on email id

        const id = req.params.id;
        console.log(id)
        const student = await studentEntry.findByPk(id);
        console.log("student exist", student);
        if (!student) {
            return res.status(404).json({ message: `${id} id student not found` });
        }

        // Only update fields provided on ui
        const allowedFields = ['first_name', 'last_name', 'email_id', 'mobile_no', 'city', 'dob'];
        const updatedData = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });

        // update student data
        await student.update(updatedData);
        return res.status(200).json({ message: 'Student data updated successfully', data: student });
    } catch (error) {
        console.error(error);

        if (error.errors[0].type === "unique violation") {
            return res.status(400).json({ status: 400, message: "unique value constraint" });
        }
        return res.status(500).json({ message: "Failed To update student data" });
    }
}

module.exports = { updateStudentData };