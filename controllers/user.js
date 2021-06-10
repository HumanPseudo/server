const bcrypt = require("bcrypt");
const User = require("../models/user");

function signUp(req, res){
    //console.log('Endpoint de signUp');
    const user = new User();
    const {name, lastname, email, password, repeatPassword} = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.role = "admin";
    user.active = false;
    
    if(!password || !repeatPassword){
        res.status(404).send({message:"Las contraseñas son Obligatorias."})
    } else {
        if(password !== repeatPassword){
            res.status(404).send({message:"Las contraseñas no coinciden."})
        }else {
            const rounds = 0 
            bcrypt.hash(password, rounds, (err,hash) => {
                if(err){
                    res.status(500).send({message:"Error al encriptar la contraseña"});
                    }else{
                        user.password = hash;
                        user.save((err, userStored) => {
                            if(err){
                                res.status(500).send({message:"error en el servidor.  " + err });
                            }else{
                                if(!userStored){
                                    res.status(404).send({message:"error al crear el usuario."});
                                }else{
                                    res.status(200).send({user: userStored});
                                }
                            }
                        })
                    }
            }); 
        }
    }
};

module.exports = {
    signUp
};