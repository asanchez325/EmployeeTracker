// Get all departments
viewDepartment = () => {
    const sql = `SELECT * FROM department`;
    let params = [];
    Connect.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
  });
     
  // Delete a Department
  deleteDepartment = () => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];
    Connect.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({ message: 'deleted', changes: this.changes });
    });
  };







  
module.exports = viewDepartment, addDepartment, deleteDepartment; }