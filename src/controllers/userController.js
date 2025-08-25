//aqui es donde se importa el modelo user y guarda en la bd
const User = require('../models/User');

//la funcion toma los datos http(req.body), crea una instancia del modelo user
exports.createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const newUser = new User({name, email, password});
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: 'Error al insertar', error: error.message})
    }
};
//funcion para recuperar a los usuarios (read)
exports.getUser = async (req, res) =>  {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};
//funcion para actualizar a los usuarios (update)
exports.updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(id, updatedData, { new: true});

        if (!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        res.status(200).json(user);
    }catch (error){
        res.status(500).json({message: 'error al actualizar', error: error.message});
    }
};