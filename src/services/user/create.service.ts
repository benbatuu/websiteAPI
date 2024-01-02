import { HTTPException } from "hono/http-exception";
import pc from "../../helpers/prismaclient.singleton";
import HttpStatusCode from "enums/httpstatustypes";

export const createUser = async (firstname: string, lastname: string, email: string, password:string, phone: string, userID:number) => {
    const isUserExist = await pc.user.findFirst({
        where: {
            email: email,
            AND: {
                phone: phone,
                email: email,
            },
        },
    });

    if (isUserExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'user_already_exist' });

    const user = await pc.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            createdat: new Date(),
            createdby: userID,
        },
    });
    return { data: user, message: 'user_created_successfully' };
}