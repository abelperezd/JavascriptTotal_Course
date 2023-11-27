const express = require("express");
const app = express();

const mySQL = require("./connection");

app.use(express.json());

app.get("/student/:id", (request, response) => {
    mySQL.connection.query(
        `SELECT * FROM student s WHERE s.id = (?)`, request.params.id,
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw (error);
            }
            else if (results)
                console.log(results);
            response.send(results);
        });
})

app.post("/student/create", (request, response) => {
    const { name, mail } = request.body;
    mySQL.connection.query(
        "INSERT INTO student (name, mail) VALUES (?, ?)",
        [name, mail],
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.post("/qualification/create", (request, response) => {
    const { student_id, subject_id, grade } = request.body;
    mySQL.connection.query(
        "INSERT INTO qualification (student_id, subject_id, grade, date) VALUES (?, ?, ?, ?)",
        [student_id, subject_id, grade, getCurrentDate()],
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.put("/qualification/:id/update", (request, response) => {
    mySQL.connection.query('UPDATE qualification SET subject_id = "' + request.body.subject_id + '"' +
        ', student_id = ' + request.body.student_id +
        ', grade = ' + request.body.grade +
        ', date = "' + getCurrentDate() + '" ' +
        'WHERE id = ' + request.params.id,
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.delete("/qualification/:id/delete", (request, response) => {
    mySQL.connection.query('DELETE FROM qualification WHERE id = ' + request.params.id,
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.get("/qualifications/:id/passed", (request, response) => {
    mySQL.connection.query('SELECT * FROM qualification WHERE subject_id = "' + request.params.subject_id + '" AND grade >= 5',
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.post("/subject/create", (request, response) => {
    const { name, teacher, description } = request.body;
    mySQL.connection.query(
        "INSERT INTO subject (name, teacher, description) VALUES (?, ?, ?)",
        [name, teacher, description],
        function (error, results) {
            if (error) {
                response.send("Error in request: " + error);
                throw error;
            }
            else if (results) {
                console.log(results);
                response.send(results);
            }
        });
})

app.set('port', 3000);
app.listen(3000, () => {
    console.log("Server is on.");
});

function getCurrentDate() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
