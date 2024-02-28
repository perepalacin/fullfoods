"use server";
import getIngredients from "@/actions/getIngredients";
import getIngredientsByName from "@/actions/getIngredientsByName";
import { NextApiRequest, NextApiResponse } from "next";


export const GET = async (req: NextApiRequest) => {
    try {
        const data = await getIngredients();
        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response("Internal Server Error", {status: 500});
    }
}