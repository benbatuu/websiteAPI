import UserStatus from "enums/userstatus";
import pc from "../../helpers/prismaclient.singleton";

export const toPassiveUser = async (userID:number, updatedBy:number) => {
    const userStatus = await pc.user.findFirst({
        select:{ status: true },
        where: { id: userID },
    });

    if (userStatus?.status === UserStatus.INACTIVE) return { data: userStatus, message: 'user_already_passive' };

    const passivedUser = await pc.user.update({
        data: {
            status: UserStatus.INACTIVE,
            updatedat: new Date(),
            updatedby: updatedBy,
        },
        where:{ id: userID }
    });
    return { data: passivedUser, message: 'user_status_changed_active_to_passive_successfully' };
}