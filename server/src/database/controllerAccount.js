const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");
//get 200
const getAuthentification = (req, res) => {
    const { login_name, pass_word } = req.body;
    //check if login name exists
    pool.query(queries.checkLoginExists, [login_name], async(error, results) => {
        try {
            if (error) throw error;
            if (results.rows.length) {
                //console.log("paw: " + results.rows[0].pass_word + results.rows.length);
                let comp = await tools.ComparePassword(
                    pass_word,
                    results.rows[0].pass_word
                );
                //console.log("comp: " + comp);
                if (comp == true) {
                    res.status(200).json({
                        role_id: results.rows[0]["role_id"],
                        manager_id: results.rows[0]["id"],
                    });
                } else {
                    res.status(202).json("Login failed");
                }
            } else {
                res.status(202).json("Login failed");
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};
//get 200
const getAccounts = (req, res) => {
    pool.query(queries.getAccounts, (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getAccountById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAccountById, [id], (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//post-201
const addAccount = async(req, res) => {
    const { login_name, display_name, pass_word, role_id } = req.body;
    const encryptedPassword = await tools.GetEncryptedPassword(pass_word);
    //check if login name exists
    pool.query(queries.checkLoginExists, [login_name], (error, results) => {
        try {
            if (error) throw error;
            if (results.rows.length) {
                res.status(202).json("Login already exists.");
            } else {
                console.log("encryptedPassword: " + encryptedPassword);
                //add account to db
                pool.query(
                    queries.addAccount, [login_name, display_name, encryptedPassword, role_id],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Account created Successfully!");
                        } catch (err) {
                            res.status(203).json({ error: "Error Database! " + err });
                        }
                    }
                );
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};
//delete-200with content or 204 without content
const deleteAccountById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAccountById, [id], (error, results) => {
        try {
            const noAccountFound = !results.rows.length;
            if (noAccountFound) {
                res.status(202).json("Account does not exist in the database");
            } else {
                pool.query(queries.deleteAccountById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Account id: " + id + " deleted Successfully!");
                    } catch (err) {
                        res.status(203).json({ error: "Error Database! " + err });
                    }
                });
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};
//put 201
const updateAccount = (req, res) => {
    const id = parseInt(req.params.id);
    const { display_name, pass_word, role_id } = req.body;
    pool.query(queries.getAccountById, [id], (error, results) => {
        try {
            const noAccountFound = !results.rows.length;
            if (noAccountFound) {
                res.status(202).json("Account does not exist in the database");
            } else {
                pool.query(
                    queries.updateAccount, [id, display_name, pass_word, role_id],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Account updated Successfully!");
                        } catch (err) {
                            res.status(203).json({ error: "Error Database! " + err });
                        }
                    }
                );
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};
module.exports = {
    getAuthentification,
    getAccounts,
    getAccountById,
    addAccount,
    deleteAccountById,
    updateAccount,
};