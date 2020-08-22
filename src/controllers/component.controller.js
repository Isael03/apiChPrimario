
const { users, login, componente,maquinaria } = require("../database/database");
const { validExist } = require("./Helpers");

//POST Create Component
const CreatingComponent = async(req,res)=>{
    const { Denominacion,Id_maquinaria,Estado } = req.body;
    try {
        const errors = [];
        const maquinariaResult = await validExist("maquinaria",Id_maquinaria,"Id_maquinaria");

        maquinariaResult != null ? errors.push(maquinariaResult) : null;

        if (errors.length>0) {
            return res.status(422).json({errors});
        }


        //VALID EXIST ON TABLE MAQUINARIA AND ESTADO IS BINARY
        // const IdMaquinaria = await maquinaria.findAll({
        //     attributes: ['Id_maquinaria'],
        //     where:{
        //         Id_maquinaria:Id_maquinaria
        //     }
        // });
        // if (typeof IdMaquinaria[0] === "undefined" || !(Estado == true || Estado == false)) {
        //     return res.status(422).json({errores : "Verifique los datos ingresados (Maquinaria, Estado)"})
        // }

        let newUser = await componente.create({
            Denominacion,
            Id_maquinaria,
            Estado
        });
        if (newUser) {
            return res.json({
                message:'Component Created Successfully',
                data:newUser
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       }) 
    }
}

//Get List Component
const ListComponent = async(req,res)=>{
    try {
        const ComponentesList = await componente.findAll();
        res.json(ComponentesList);
    } catch (error) {
        console.log(error);
        return res.status(500),json({
           message:"Ha ocurrido un error",
           data:{}
       })         
    }
}
//PUT UPDATE Componentes
const UpdateComponente = async(req,res)=>{
    const { Denominacion,Id_maquinaria,Estado } = req.body;
    const Id_componente = req.params.Id_componente
    try {
        //VALIDATION
        const errors = [];
        const maquinariaResult = await validExist("maquinaria",Id_maquinaria,"Id_maquinaria");
        const componentResult = await validExist("componente",Id_componente,"Id_componente");
        maquinariaResult != null ? errors.push(maquinariaResult) : null;
        componentResult != null ? errors.push(componentResult) : null;
        if (errors.length>0) {
            return res.status(422).json({errors});
        }

        await componente.update(req.body,{
            where:{ Id_componente: Id_componente}
        });
        console.log("Componente Modificado");
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
const DeleteComponent = async(req,res)=>{
    if (Number.isInteger(req.params.Id_componente)) {
        return res.status(422).json({errores : "El id del componente no es valido"})
    }
    try {
        const Id_componente = req.params.Id_componente; 
        // VALIDATION
        const errors = [];
        const componentResult = await validExist("componente",Id_componente,"Id_componente");
        componentResult != null ? errors.push(componentResult) : null;
        if (errors.length>0) {
            return res.status(422).json({errors});
        }

        await componente.destroy({
            where:{ Id_componente: req.params.Id_componente}
        });
        console.log(`Componente Eliminado ${req.params.Id_componente}`);

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
    CreatingComponent,
    UpdateComponente,
    DeleteComponent,
    ListComponent
};