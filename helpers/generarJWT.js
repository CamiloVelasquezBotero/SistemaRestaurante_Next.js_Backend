import jwt from 'jsonwebtoken'; 

const generarJWT = id => {
    return jwt.sign({id}, process.env.PALABRA_SECRETA, {expiresIn: '30d'})
}

export default generarJWT;