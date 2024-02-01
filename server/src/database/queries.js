//queries reg accounts
const getAccounts = "select a.*, r.role_name from account a, role r where a.role_id = r.id order by a.id asc";
const getAccountById = "select * from account where id = $1";
const checkLoginExists = "select a from account a where a.login_name = $1";
const addAccount = "insert into account(login_name, display_name, pass_word, role_id) values ($1, $2, $3, $4)";
const updateAccount ="update account set display_name = $2, pass_word = $3, role_id = $4 where id = $1";
const deleteAccountById = "delete from account where id = $1";
const getAuthentification = "select * from account a where a.login_name = $1 and a.pass_word = $2";

//queries reg DCS
const getDCs = "select d.*, ds.label as status_name from dc d, dc_status ds where d.dc_status = ds.id";
const getDCById = "select d.*, ds.label as status_name from dc d, dc_status ds where d.id = $1 and d.dc_status = ds.id";
const getDCDocById = "select dc.document from dc where id = $1 limit 1";
const checkDCExists = "select a from dc a where a.email = $1";
const addDC = "insert into dc(familyname, firstname, email, dc_status, document) values ($1, $2, $3, $4, $5)";// add tags ici
const updateDCByAdmin ="update dc set familyname=$2, firstname=$3, email=$4, dc_status=$5, tags = $6 where id = $1";//controle sur email
const updateDCDoc ="update dc set document = $2, dc_status=$3 where id = $1";
const deleteDCById = "delete from dc where id = $1";

//queries reg DC-Status
const getAllDcStatus = "select * from dc_status";

module.exports = {
    getAuthentification,
    getAccounts,
    getAccountById,
    checkLoginExists,
    addAccount,
    updateAccount,
    deleteAccountById, 
    
    getDCs,
    getDCById,
    getDCDocById,
    checkDCExists,
    addDC,
    deleteDCById,
    updateDCByAdmin,
    updateDCDoc,
    getAllDcStatus
    


};