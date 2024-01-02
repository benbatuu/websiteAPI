import { HTTPException } from "hono/http-exception";
import pc from "../../helpers/prismaclient.singleton";
import HttpStatusCode from "enums/httpstatustypes";

export const createServices = async (name: string, description: string, duration: number, durationtype:number, price: string, pricetype:string,thumbnail: string, createdby: number) => {
    const isServicesExist = await pc.services.findFirst({ where: { name: name } });

    if (isServicesExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, {message: "service_already_exist"});
    
    const services = await pc.services.create({
        data: {
            name: name,
            description: description,
            duration: duration,
            durationtype: durationtype,
            price: price,
            pricetype: pricetype,
            thumbnail: thumbnail,
            createdby: createdby,
        },
        select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            durationtype: true,
            price: true,
            pricetype: true,
            thumbnail: true,
            createdat: true,
            createdby: true,
            status: true,
        },
    });

    return services;
}