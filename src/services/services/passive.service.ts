import UserStatus from "enums/userstatus";
import pc from "../../helpers/prismaclient.singleton";

export const toPassiveServices = async (id: number, updatedby:number) => {
    const isServicesExist = await pc.services.findUnique({ where: { id: id } });

    if (!isServicesExist) throw new Error("service_not_found");
    if (isServicesExist.status === UserStatus.INACTIVE) throw new Error("service_already_inactive");

    const services = await pc.services.update({
        where: { id: id },
        data: {
            status: UserStatus.INACTIVE,
            updatedat: new Date(),
            updatedby: updatedby,
        },
        select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            price: true,
            thumbnail: true,
            createdat: true,
            createdby: true,
            status: true,
        },
    });

    return { data: services, message: "service_status_changed_active_to_passive_succesfully" };
}