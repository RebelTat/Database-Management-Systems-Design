const dbConnection = require('../database/connection');

class DepartmentController {
    constructor () {
        console.log('Department Controller Initialized');
    }

    getDepartmentByName (name) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BK_Department WHERE dept_name = ?';
            dbConnection.query(
                {
                    sql: query,
                    values: [name]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }

    joinDepartmentByName (name) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BK_Department JOIN BK_Student ON BK_Student.dept_name = BK_Department.dept_name WHERE BK_Student.name = ?';
            dbConnection.query(
                {
                    sql: query,
                    values: [name]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }

    addDepartment (department) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO BK_Department
                (dept_name, building, budget) VALUES
                (?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [department.dept_name, department.building, department.budget]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }



}

module.exports = DepartmentController;