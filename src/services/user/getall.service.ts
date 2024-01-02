import pc from "../../helpers/prismaclient.singleton";

export const getAllUsers = async () => { 
    const users = await pc.user.findMany(); 
    return users; 
}