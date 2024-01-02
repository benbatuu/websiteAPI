import UserStatus from "enums/userstatus";
import pc from "../../helpers/prismaclient.singleton";

export const toActiveUser = async (userID:number, updatedBy:number) => {
    const userStatus = await pc.user.findFirst({
        select:{ status: true },
        where: { id: userID },
    });

    if (userStatus?.status === UserStatus.ACTIVE) return { data: userStatus, message: 'user_already_active' };

    const activatedUser = await pc.user.update({
        data: {
            status: UserStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: updatedBy,
        },
        where:{ id: userID }
    });
    return { data: activatedUser, message: 'user_status_changed_passive_to_active_succesfully.' };
}