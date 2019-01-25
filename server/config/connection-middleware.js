module.exports = pool => (req, res, next) => {

    pool.getConnection((err, connection) => {
        if(err) return next(err);
        console.log('pool => get connection');

        // adicionou a conexao na requisicao
        req.connection = connection;

        // passa a requisicao o proximo middleware
        next();

        res.on('finish', () => req.connection.release());
    });
};
