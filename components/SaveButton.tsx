"use client";
import axios from 'axios';
import { BookmarkIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SaveButtonProps {
    recipeId: string
}

const SaveButton = (params: SaveButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        //TODO: THIS API IS CURRENTLY NOT WORKING
        //THE USER THAT SAVES THE RECIPE, CAN'T EDIT THE ROW OF THE RECIPE
        //AS HE IS NOT THE AUTHOR!
        //THUS WE HAVE TO FIND A WORKAROUND!
        try{
            //We will connect to the API prompt new to include the prompt onto the DB.
            const response = await fetch("/api/save", 
            {
                method: "POST",
                body: JSON.stringify({
                    recipeId: params.recipeId,
                })
            });

            if(response.ok) {
                // router.push("/");
            }
        }catch (error){
            console.log(error);
            toast.error("Couldn't save the recipe. Try again later");
        } finally {
            setIsLoading(false);
            toast.success("Recipe Saved Succesfully");
        }
    };

    return (
    <button className="py-1.5 px-1.5 rounded-sm bg-secondary/50 backdrop-blur-md hover:bg-secondary transition-colors duration-200" onClick={handleClick}>
        {isLoading ? 
        <Loader2Icon className="animate-spin" />
        :
        <BookmarkIcon />
        }
    </button>
    )
}

export default SaveButton