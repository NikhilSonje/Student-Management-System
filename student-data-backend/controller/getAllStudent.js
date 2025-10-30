const StudentEntry = require("../models/studentEntry");
const StudentMarksData = require("../models/studentMark");

async function getAllStudent(req, res) {
    try {
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await StudentEntry.findAndCountAll({
            limit,
            offset,
            order: [['created_at', 'ASC']],
            include: [
                {
                    model: StudentMarksData,
                    attributes: ['id'],
                    required: false,
                    as: 'marks'
                }
            ]
        });

        // flag for already added marks
        const studentsWithMarksFlag = rows.map(student => ({
            ...student.dataValues,
            hasMarks: student.dataValues.marks ? true : false
        }));

        return res.status(200).json({
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            data: studentsWithMarksFlag
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get students from DB" });
    }
}

module.exports = { getAllStudent };
