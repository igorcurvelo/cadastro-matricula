class StudentDao {

    constructor(connection) {
        this._connection = connection;
    }

    findAll() {
        return new Promise((resolve, reject) =>
            this._connection.query('SELECT * FROM student', (err, students) => {
                if(err) return reject(err);
                return resolve(students);
            })
        )

    }

    findOne(id) {
        return new Promise((resolve, reject) =>
            this._connection.query('SELECT * FROM student WHERE id = ?', id, (err, results, fields) => {
                if(err) return reject(err);
                return resolve(results[0]);
            })
        )

    }

    save({name, code}) {
        return new Promise((resolve, reject) =>
            this._connection.query('INSERT INTO student(name, code) values (?, ?)', [ name, code ],
             (err, results, fields) => {
                if(err) return reject(err);
                return resolve(results.insertId);
            })
        )
    }

    update(studentId, {id, name, code}) {
        return new Promise((resolve, reject) => 
        this._connection.query('UPDATE student SET name = ?, code = ? WHERE id = ?')
        [name, code, studentId], (err, results, fields) => {
            if(err) return reject(err);
                return resolve(results[0]);
        })
    }

}

module.exports = StudentDao;