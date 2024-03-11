
import { Router } from "express";;
import UserController from '../../controllers/user.controller.js'
import { authenticationMiddleware, authorizarionMiddeleware } from "../../utils/util.js";
import { isSuperAdmin } from '../../utils/util.js';

const router = new Router();


router.get('/users', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN"]), async (req, res, next) => {

    const { page = 1, limit = 5, sort } = req.query; // sort: asc | desc
    const opts = { page, limit, sort: { id: sort || 'asc' } };
    const criteria = {};
    let esAdministrador = false;

    try {

        const users = await UserController.getAll()
        let info = buildResponse({ ...users, sort });
        info.payload = info.payload.filter(user => user.email !== req.user.email);



        if (req.user.role === 'ADMIN')
            esAdministrador = true;


        let rolesArray = ['PUBLIC', 'USER', 'ADMIN', 'PREMIUN'];
        //const index = rolesArray.indexOf(req.user.role);
        // if (index !== -1) {
        //     rolesArray.splice(index, 1);
        // } 

        info = { ...info, title: 'Usuarios Registrados', user: req.user, isAdministrator: esAdministrador, roles: rolesArray }
        res.render('users', { info });

    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.docs.map(user => user.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.sort ? `&sort=${data.sort}` : ''}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    };
};




export default router;