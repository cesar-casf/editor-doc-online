const heroku = 'postgres://vffyjxkovmqnsy:c249e93f0c4f81be868529168c1774c0f0dc2a4dd8911788a83da6807b2549d3@ec2-18-235-4-83.compute-1.amazonaws.com:5432/d3v1vns0ko2pqh?ssl=true';
const local =  'postgres://postgres:postgres@localhost:5433/trabalho-ecos12';

async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: heroku,
        ssl: { rejectUnauthorized: false },
        max: 100
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Pool de conexões no PostgreSQL criado!");

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function conectar(){
    const client = await connect();
    return client;
}

async function selectDocs(client, doc) {
    //const client = await connect();
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
    //const client = await connect();
    const sql = `UPDATE arquivo SET conteudo=$1 WHERE id=${doc}`;
    console.log(sql);
    return await client.query(sql, data);
}
 
module.exports = { selectDocs, insertDoc, conectar, createDoc };

 connect();