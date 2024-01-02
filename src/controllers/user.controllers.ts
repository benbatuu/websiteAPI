import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
import { getAllUsers } from 'services/user/getall.service';
import { getUserByID } from 'services/user/get.service';
import { createUser } from 'services/user/create.service';
import { updateUser } from 'services/user/update.service';
import { toPassiveUser } from 'services/user/passive.service';
import { toActiveUser } from 'services/user/active.service';

const userController = new Hono();

userController.get('/', async (c) => {
    const response = await getAllUsers();
    return c.json(response);
});

userController.get('/:id', async (c) => {
    const userID = c.req.param('id');
    const response = await getUserByID(parseInt(userID));
    return c.json(response);
});

userController.post('/', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const body = await c.req.json();
    const createdUser = await createUser(body.firstname, body.lastname, body.email, body.password, body.phone, userID);
    return c.json(createdUser);
});

userController.put('/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const userID = c.req.param('id');
    const body = await c.req.json();
    const updatedUser = await updateUser(body.firstname, body.lastname, body.email, body.password, body.phone, parseInt(userID), parseInt(updatedBy));
    return c.json(updatedUser);
});

userController.put('/passive/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const userID = c.req.param('id');
    const passivedUser = await toPassiveUser(parseInt(userID), parseInt(updatedBy));
    return c.json(passivedUser);
});

userController.put('/active/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const userID = c.req.param('id');
    const activedUser = await toActiveUser(parseInt(userID), parseInt(updatedBy));
    return c.json(activedUser);
});
export default userController;