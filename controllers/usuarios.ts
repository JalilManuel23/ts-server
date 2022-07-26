import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async( req: Request, res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);
}

export const getUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: 'No existe el usuario'
        });
    }
}

export const postUsuario = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            });
        }

        const usuario = new Usuario();
        await usuario.save();

        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        });
    }
}

export const putUsuario = ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await Usuario.findByPk(id);

        if( !user ) {
            return res.status(404).json({
                msg: 'No existe el usuario con ese ID'
            })
        }

        await user.update(body);

        res.json(user);
    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        });
    }
}

export const deleteUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await Usuario.findByPk(id);

    if( !user ) {
        return res.status(404).json({
            msg: 'No existe el usuario con ese ID'
        })
    }

    await user.update({ estado: false });

    res.json({
        msg: 'deleteUsuario',
        id
    });
}