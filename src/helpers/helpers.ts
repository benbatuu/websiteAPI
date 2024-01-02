import { Context } from 'hono';
import { v4 as uuidv4 } from 'uuid';

const generateRefreshToken = (userid: number) => `${uuidv4()}${userid}${uuidv4()}`.replace(/[-]/g, '');

const generateTraceCode = () => {
    const givenSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let code = '';
    for (let i = 0; i < 8; i++) {
        let pos = Math.floor(Math.random() * givenSet.length);
        code += givenSet[pos];
    }
    return code;
};

const findIPAddress = (c: Context) => c.req.header('CF-Connecting-IP') || c.req.header('X-Real-IP') || c.req.header('X-Forwarded-For') || '';

const todayDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('tr-TR', {
        timeZone: 'Europe/Istanbul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        minute: '2-digit',
        hour: '2-digit',
    });
    const replaced = formattedDate.replace('.', '').replace('.', '').replace(' ', '').replace(':', '').replace(':', '');
    return replaced;
};

export {
    generateRefreshToken,
    generateTraceCode,
    findIPAddress,
    todayDateTime
};
