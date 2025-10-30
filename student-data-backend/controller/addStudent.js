const StudentEntry = require("../models/studentEntry");
const addStudentSchema = require("../validation/validationSchema").addStudentSchema;
const { validateCheck } = require("../services/validation");

async function createNewStudent(req, res) {
    const inputBody = req.body;
    console.log("Input Body:", inputBody);

    // body schema validation
    const isValidate = await validateCheck(addStudentSchema, inputBody);
    console.log("isvalidate", isValidate);

    if (!isValidate.flag) {
        return res.status(400).send({ status: "400", message: isValidate.error });
    }

    try {
        const { first_name, last_name, email_id, mobile_no, city, dob } = req.body;
        // check student already exist

        const existingStudent = await StudentEntry.findOne({
            where: { email_id }
        })

        console.log("is Student Exist", existingStudent);

        if (existingStudent) {
            return res.status(400).json({ message: "Entered Student Data already exists in the database" });
        }

        // add new student in db
        const newStudent = await StudentEntry.create({
            first_name,
            last_name,
            email_id,
            mobile_no,
            city,
            dob
        });

        console.log("New Student Data", newStudent);

        if (newStudent && newStudent.id) {
            return res.status(201).json({ message: "New Student Data Added Successfully", data: newStudent });
        } else {
            return res.status(500).json({ message: "Failed to add Student data" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add student in DB" });
    }
}

module.exports = { createNewStudent };