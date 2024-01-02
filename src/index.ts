import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { secureHeaders } from 'hono/secure-headers';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from './enums/httpstatustypes';
import exp = require('constants');
import authController from './controllers/auth.controllers';
import userController from './controllers/user.controllers';
import servicesController from 'controllers/services.controllers';

const app = new Hono();

app.use('*', cors());
app.use('*', etag());
app.use('*', secureHeaders());

// JWT verify middleware
app.use('*', async (c, next) => {
    if (c.req.path !== '/auth/authorize' && c.req.path !== '/' && c.req.path !== '/auth/refreshtoken') {
        if (!c.req.header(env.JWT_HEADER_NAME!)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

        const header = c.req.header(env.JWT_HEADER_NAME!)!;

        if (!header.startsWith(`${env.JWT_TOKEN_TYPE} `)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

        const token = await jwtverify(header.split(' ')[1], env.JWT_SECRET!);

        if (
            (c.req.path === '/auth/login' && token.tokentype !== env.AUTH_TOKEN_TYPE) ||
            (c.req.path !== '/auth/login' && token.tokentype !== env.LOGIN_TOKEN_TYPE)
        ) {
            throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });
        }

        /*const revokedToken = await prisma.revokedtoken.count({ where: { token: token } });
        if (revokedToken > 0) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });*/
    }
    await next();
});

app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`);
    await next();
    c.header('X-Powered-By', 'bennbatuu');
});

app.notFound((c) => {
    return new Response(JSON.stringify({ error: { message: 'Not Found', route: c.req.path } }), {
        status: HttpStatusCode.NOT_FOUND,
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

app.onError((err, c) => {
    if (err instanceof HTTPException)
        return new Response(JSON.stringify({ error: { message: err.message } }), {
            status: HttpStatusCode.BAD_REQUEST,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    console.log(err.message);
    return new Response(JSON.stringify({ error: { message: 'Internal Server Error' } }), {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

app.get('/', (c) => c.json({ data: 'OK' }));

app.route('/auth', authController);
app.route('/user', userController);
app.route('/service', servicesController);

export default app;