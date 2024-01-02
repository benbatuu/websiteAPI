import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
import { toActiveServices } from 'services/services/active.service';
import { createServices } from 'services/services/create.service';
import { getServicesByID } from 'services/services/get.service';
import { getAllServices } from 'services/services/getall.service';
import { toPassiveServices } from 'services/services/passive.service';
import { updateServices } from 'services/services/update.service';

const servicesController = new Hono();

servicesController.get('/', async (c) => {
    const response = await getAllServices();
    return c.json(response);
});

servicesController.get('/:id', async (c) => {
    const servicesID = c.req.param('id');
    const response = await getServicesByID(parseInt(servicesID));
    return c.json(response);
});

servicesController.post('/', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const body = await c.req.json();
    const createdServices = await createServices(body.name, body.description, body.duration, body.price, body.thumbnail, userID);
    return c.json(createdServices);
});

servicesController.put('/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const servicesID = c.req.param('id');
    const body = await c.req.json();
    const updatedServices = await updateServices(parseInt(servicesID), body.name, body.description, body.duration, body.price, body.thumbnail, parseInt(updatedBy));
    return c.json(updatedServices);
});

servicesController.put('/passive/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const servicesID = c.req.param('id');
    const passivedServices = await toPassiveServices(parseInt(servicesID), parseInt(updatedBy));
    return c.json(passivedServices);
});

servicesController.put('/active/:id', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedBy = jwtPayload.sub_id;
    const servicesID = c.req.param('id');
    const activedServices = await toActiveServices(parseInt(servicesID), parseInt(updatedBy));
    return c.json(activedServices);
});

export default servicesController;