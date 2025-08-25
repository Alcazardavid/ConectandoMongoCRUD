//aqui es donde se importa el modelo user y guarda en la bd
const User = require('../models/User');

//la funcion toma los datos http(req.body), crea una instancia del modelo user
exports.createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password
        });
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: 'Error al insertar', error: error.message})
    }
}