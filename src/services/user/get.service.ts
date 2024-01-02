import pc from '../../helpers/prismaclient.singleton';

export const getUserByID = async (id: number) => {
    const user = await pc.user.findUnique({
        select:{
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            createdat: true,
            createdby: true,
            status: true,
        },
        where: {
            id: id,
        },
    });
    return user;
}