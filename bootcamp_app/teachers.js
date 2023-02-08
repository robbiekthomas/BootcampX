const { Pool } = require("pg");

const args = process.argv.slice(2);

const pool = new Pool({
  user: "labber",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${args[0]}%'
ORDER BY teachers.name;
    `
  ).then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.cohorts}: ${user.teacher}`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));