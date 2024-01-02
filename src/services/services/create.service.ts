import { HTTPException } from "hono/http-exception";
import pc from "../../helpers/prismaclient.singleton";
import HttpStatusCode from "enums/httpstatustypes";

export const createServices = async (name: string, description: string, duration: number, price: number, thumbnail: string, createdby: number) => {
    const isServicesExist = await pc.services.findFirst({ where: { name: name } });

    if (isServicesExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, {message: "service_already_exist"});
    
    const services = await pc.services.create({
        data: {
            name: name,
            description: description,
            duration: duration,
            price: price,
            thumbnail: thumbnail,
            createdby: createdby,
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

    return services;
}