import pc from "../../helpers/prismaclient.singleton";

export const getAllServices = async () => {
    const services = await pc.services.findMany({
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