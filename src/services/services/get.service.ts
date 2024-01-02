import { HTTPException } from "hono/http-exception";
import pc from "../../helpers/prismaclient.singleton";
import HttpStatusCode from "enums/httpstatustypes";

export const getServicesByID = async (id: number) => {
    const isServicesExist = await pc.services.findUnique({ where: { id: id } });

    if (!isServicesExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, {message: "service_not_found"})

    const services = await pc.services.findUnique({
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
        where: { id: id },
    });

    return services;
}