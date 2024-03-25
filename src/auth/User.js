const User = require("../database/models/user");

async function FindByEmail(email){
    return await User.findOne({ where: {email_user: email}, attributes: ['id_user', 'nome_user','email_user','senha_user']})
}

async function SaveUser(user){
    
const {nome_user,email_user,senha_user} = user
    const post = await User.create({nome_user,email_user,senha_user})
    return post
}

module.exports = {FindByEmail, SaveUser}
 