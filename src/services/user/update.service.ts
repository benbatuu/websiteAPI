import { HTTPException } from "hono/http-exception";
import pc from "../../helpers/prismaclient.singleton";

export const updateUser = async (firstname: string, lastname: string, email: string, password:string, phone: string, userID:number, updatedBy:number) => {
    const updatedUser = await pc.user.update({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            updatedat: new Date(),
            updatedby: updatedBy,
        },
        where:{
            id: userID,
        }
    });
    return { data: updatedUser, message: 'user_updated_successfully' };
}