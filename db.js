const local =  'postgres://postgres:postgres@localhost:5432/editor_dB';

async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL || local,
        ssl:  process.env.DATABASE_URL ? true : false,
        max: 100
    });

    const client = await pool.connect();
    console.log("Pool de conexões no PostgreSQL criado!");

    global.connection = pool;
    return pool.connect();
}

async function conectar(){
    const client = await connect();
    return client;
}

async function selectDocs(client, doc) {
    let sql = `SELECT * FROM arquivo WHERE id = ${doc}`;
    console.log(sql);
    const resp = await client.query(sql);
    return resp.rows[0];
}

async function createDoc(client) {
    const sql = `INSERT INTO arquivo (conteudo) VALUES ('') RETURNING id;`;
    console.log(sql);
    const resp = await client.query(sql);
    return resp.rows[0];
}

async function insertDoc(client, texto, doc) {
    let data = [texto];
    const sql = `UPDATE arquivo SET conteudo=$1 WHERE id=${doc}`;
    console.log(sql);
    return await client.query(sql, data);
}
 
module.exports = { selectDocs, insertDoc, conectar, createDoc };

 connect();