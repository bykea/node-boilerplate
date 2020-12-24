module.exports = function MdlUsers() {
    return {
        auth: 'SELECT id FROM users WHERE username=${username} AND password=${password}',
        exists: 'SELECT COUNT(id) AS exists FROM users WHERE id=${id}',
        create: 'INSERT INTO users(username,password,email,number,enc_salt) VALUES (${username},${password},${email},${number}, ${enc_salt}) RETURNING id'
    }
}

