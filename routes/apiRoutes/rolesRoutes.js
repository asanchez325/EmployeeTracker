viewRoles = () => {
    const sql = `SELECT * FROM roles`;
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

}
  module.exports = viewRoles; 