//View Employees
viewEmployee = () => {
    const sql = `SELECT * FROM employee`;
    let params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
  });

}
  module.exports = viewEmployee; 