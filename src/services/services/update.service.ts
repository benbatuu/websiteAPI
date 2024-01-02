import HttpStatusCode from "enums/httpstatustypes";
import pc from "../../helpers/prismaclient.singleton";
import { HTTPException } from "hono/http-exception";

export const updateServices = async (id: number, name: string, description: string, duration: number,durationtype:number, price: number, thumbnail: string, updatedby: number) => {

    const isServicesExist = await pc.services.findFirst({ where: { id: id } });
    
    if (!isServicesExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, {message: "service_not_found"});

    const services = await pc.services.update({
        where: { id: id },
        data: {
            name: name,
            description: description,
            duration: duration,
            durationtype: durationtype,
            price: price,
            thumbnail: thumbnail,
            updatedby: updatedby,
            updatedat: new Date(),
        },
        select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            price: true,
            thumbnail: true,
            updatedat: true,
            updatedby: true,
            status: true,
        },
    });

    return services;
}