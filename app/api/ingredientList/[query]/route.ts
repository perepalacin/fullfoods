"use server";
import getIngredientsByName from "@/actions/getIngredientsByName";
import { NextApiRequest } from "next";


export const GET = async (req: NextApiRequest, {params}: {params: {query: string}}) => {
    try {
        const data = await getIngredientsByName(params.query);
        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response("Internal Server Error", {status: 500});
    }
}