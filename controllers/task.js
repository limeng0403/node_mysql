//var mysql = require('mysql');

let pool = require('../conf/mysql_pool');

function task() {}

task.prototype.getAll = (req, res) => {
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send({
                status: 0,
                msg: err
            });

            return false;
        }

        let sqlStr = 'SELECT * from task';
        let page = req.params.page || 1;
        let pageSize = req.params.pagesize || 0;

        if (page && pageSize) {
            sqlStr += ' limit ' + (page - 1) * pageSize + ',' + pageSize;
        }

        conn.query(sqlStr, function(err, rows, fields) {
            if (err) {
                res.send({
                    status: 0,
                    msg: err
                });
            }

            res.send({
                status: 1,
                data: rows
            });
        });
    });
}

task.prototype.insert = (req, res) => {
    let sqlStr = 'insert into task (title,finished) values(?,?)';
    let title = req.body.title || '';
    let finished = req.body.finished || '';

    if (title == '' || finished == '') {
        res.send({
            status: 0,
            msg: 'Params can not be empty.'
        });

        return false;
    }

    let connP = new Promise(function(resolve, reject) {
        pool.getConnection((err, conn) => {
            if (err) {
                reject({
                    status: 0,
                    msg: err
                });
            }

            resolve(conn);
        });
    });

    let insertP = (conn) => {
        return new Promise(function(resolve, reject) {
            conn.query(sqlStr, [title, finished], function(err, rows) {
                if (err) {
                    reject({
                        status: 0,
                        msg: err
                    });
                }

                console.log(rows);

                resolve({
                    status: 1,
                    data: rows
                });
            });
        });
    }

    connP
        .then(insertP)
        .then((reData) => {
            res.send(reData);
        })
        .catch((msg) => {
            res.send(msg);
        });
}

task.prototype.update = (req, res) => {
    let sqlStr = 'update task set title=?,finished=? where id=?';
    let id = req.body.id || 0;
    let title = req.body.title || '';
    let finished = req.body.finished || '';

    if (id == 0 || title == '' || finished == '') {
        res.send({
            status: 0,
            msg: 'Params can not be empty.'
        });

        return false;
    }

    let connP = new Promise(function(resolve, reject) {
        pool.getConnection((err, conn) => {
            if (err) {
                reject({
                    status: 0,
                    msg: err
                });
            }

            resolve(conn);
        });
    });

    let updateP = (conn) => {
        return new Promise(function(resolve, reject) {
            conn.query(sqlStr, [title, finished, id], function(err, rows) {
                if (err) {
                    reject({
                        status: 0,
                        msg: err
                    });
                }

                console.log(rows);

                resolve({
                    status: 1,
                    data: rows
                });
            });
        });
    }

    connP
        .then(updateP)
        .then((reData) => {
            res.send(reData);
        })
        .catch((msg) => {
            res.send(msg);
        });
}

task.prototype.delete = (req, res) => {
    let sqlStr = 'delete from task where id=?';
    let id = req.body.id || 0;

    if (id == 0) {
        res.send({
            status: 0,
            msg: 'Params can not be empty.'
        });

        return false;
    }

    let connP = new Promise(function(resolve, reject) {
        pool.getConnection((err, conn) => {
            if (err) {
                reject({
                    status: 0,
                    msg: err
                });
            }

            resolve(conn);
        });
    });

    let deleteP = (conn) => {
        return new Promise(function(resolve, reject) {
            conn.query(sqlStr, id, function(err, rows) {
                if (err) {
                    reject({
                        status: 0,
                        msg: err
                    });
                }

                console.log(rows);

                resolve({
                    status: 1,
                    data: rows
                });
            });
        });
    }

    connP
        .then(deleteP)
        .then((reData) => {
            res.send(reData);
        })
        .catch((msg) => {
            res.send(msg);
        });
}

module.exports = new task();
