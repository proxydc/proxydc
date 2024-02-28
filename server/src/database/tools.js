const bcrypt = require('bcrypt');
async function GetEncryptedPassword(pwd) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pwd, salt);
    } catch (err) {
        throw err;
    }

}
async function ComparePassword(pwd, hpwd) {
    try {
        return await bcrypt.compare(pwd, hpwd);
    } catch (err) {
        throw err;
    }

}
module.exports = {
    GetEncryptedPassword,
    ComparePassword,
}