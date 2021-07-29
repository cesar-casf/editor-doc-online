async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:postgres@localhost:5433/trabalho-ecos12'
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Pool de conexões no PostgreSQL criado!");

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectDocs() {
    const client = await connect();
    const resp = await client.query(`SELECT * FROM arquivo WHERE id = 1`);
    return resp.rows[0];
}
 
module.exports = { selectDocs };

connect();