
const { users } = require("../database/database");
const { validExist, validateTypes } = require("./Helpers");

//POST Create User
const CreatingUser = async(req,res)=>{
    const { Rut,Nombre,Apellidos,Correo_electronico,Estado,Cargo,Id_empresa } = req.body;
    const errors = [];
    try {
        //VALID RUT ON TABLE USERS
        const rutUsers = await users.findAll({ where:{ Rut:Rut }});

        if (typeof rutUsers[0] !== 'undefined') {
            return res.status(422).json({errores : "El Rut ingresado ya esta registrado"})
        }
        
        const RutResult = await validateTypes(Rut,"string",12);
        RutResult != null && errors.push(RutResult);
        if (errors.length>0) { return res.status(422).json({errors}); }
        
        let newUser = await users.create({
            Rut,
            Nombre,
            Apellidos,
            Correo_electronico,
            Estado,
            Cargo,
            Id_empresa
        });
        if (newUser) {
            return newUser;
        }
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       }) 
    }
}

//Get List Users
const ListUsers = async(req,res)=>{
    try {
        if (req.params.userRUT) {
            const UsuariosList = await users.findOne({ where: { Rut: req.params.userRUT }});
            res.json(UsuariosList);
        } else {
            const UsuariosList = await users.findAll();
            res.json(UsuariosList);
        }
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       })         
    }
}
//PUT UPDATE Users
const UpdateUser = async(req,res)=>{
    const errors = []
    const Rut = req.params.userRUT;
    req.body.Rut=req.params.userRUT;
    try {
        const usersResult = await validExist("users",Rut,"Rut","NOTEXIST");
        usersResult != null && errors.push(usersResult);
        if (errors.length>0) {
            return res.status(422).json({errors});
        }

        await users.update(req.body,{
            where:{ rut:Rut}
        });
        console.log("Usuario Modificado");
        res.json({success:'Se ha modificado'});
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       })         
    }
}
//DELETE User
const DeleteUser = async(req,res)=>{
    try {
        const Rut = req.params.userRUT;
        console.log("El rut borrado es:"+Rut);
        const errors = []
        const loginResult = await validExist("login",Rut,"Rut","EXIST");
        const usersResult = await validExist("users",Rut,"Rut","NOTEXIST");

        loginResult != null && errors.push(loginResult);
        usersResult != null && errors.push(usersResult);
        
        if (errors.length>0) {
            return res.status(422).json({errors});
        }
        
        await users.destroy({
            where:{ rut: Rut}
        });
        console.log(`Usuario Eliminado ${Rut}`);
        res.json({success:'Se ha Eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       })         
    }
}
module.exports = {
    CreatingUser,
    ListUsers,
    UpdateUser,
    DeleteUser
};