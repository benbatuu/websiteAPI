import { HTTPException } from 'hono/http-exception';
import { sign as jwtsign } from 'hono/jwt';
import { env } from 'bun';
import { PrismaClient } from '@prisma/client';
import HttpStatusCode from '../../enums/httpstatustypes';

export const logoutService = async (accesstoken: string, refreshtoken: string, userid: string) => {

}