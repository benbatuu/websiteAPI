import { env } from 'bun';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { decode as jwtdecode } from 'hono/jwt';
import HttpStatusCode from '../enums/httpstatustypes';
import { authorizeService } from '../services/auth/get.service';
import { loginService } from '../services/auth/login.service';
import { logoutService } from '../services/auth/logout.service';

const authController = new Hono();

authController.post('/authorize', async (c) => {
    const body = await c.req.json();
    if (!body.key) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'key_is_missing' });
    if (!body.secret) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'secret_is_missing' });

    const response = await authorizeService(body.key, body.secret);
    return c.json(response);
});

authController.post('/login', async (c) => {
    const body = await c.req.json();
    if (!body.email) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'email_is_missing' });
    if (!body.password) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'password_is_missing' });

    const apiclientid = jwtdecode(c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1]).payload.client_id;
    const response = await loginService(apiclientid, body.email, body.password, undefined);
    return c.json(response);
});

authController.post('/refreshtoken', async (c) => {
    const body = await c.req.json();
    if (!body.refreshtoken) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'refreshtoken_is_missing' });

    const apiclientid = jwtdecode(c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1]).payload.client_id;
    const response = await loginService(apiclientid, undefined, undefined, body.refreshtoken);
    return c.json(response);
});

authController.post('/logout', async (c) => {
    const body = await c.req.json();
    if (!body.refreshtoken) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'refreshtoken_is_missing' });

    const accesstoken = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const userid = jwtdecode(accesstoken).payload.sub_id;

    const response = await logoutService(accesstoken, body.refreshtoken, userid);
    return response;
});

export default authController;