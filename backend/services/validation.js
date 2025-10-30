async function validateCheck(studentSchema, bodyData) {
    const { error, value } = studentSchema.validate(bodyData)
    if (error) {
        console.log(error);
        return { flag: false, error: error.message };
    } else {
        return { flag: true, value }
    }
}

module.exports.validateCheck = validateCheck;