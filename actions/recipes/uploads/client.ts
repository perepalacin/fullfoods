// try {
//     if (values.recipeId) {
//       console.log("upload with id");
//       await axios.patch(`/api/recipe/${values.recipeId}`, values);
//     } else {
//       console.log("no id upload");
//       const uniqueID = uniqid();

//       if (values.imageFile) {
//         toast.success(`recipe_${uniqueID}`);
//           var {
//               data: imageData,
//               error: imageError
//           } = await supabaseClient.storage.from("images").upload(`recipe_${uniqueID}`, values.imageFile, {cacheControl: "3600", upsert: false});
          
//           if (imageError) {
//               toast.error("Error while uploading the image");
//               console.log(imageError.message);
//               //return toast.error("Failed to upload recipe image");
//               return null;
//           }
//       }

//       const {
//           error: supabaseError
//       } = await supabaseClient.from("recipes").insert({
//           recipeName: values.recipeName,
//           briefDescription: values.briefDescription,
//           kcals: values.kcals,
//           prote: values.prote,
//           carbs: values.carbs,
//           sugar: values.sugar,
//           fat: values.fat,
//           saturatedFat: values.saturatedFat,
//           salt: values.salt,
//           fiber: values.fiber,
//           savedTimes: 0,
//           difficulty: values.difficulty,
//           time: values.time,
//           steps: values.steps,
//           nOfIngredients: values.nOfIngredients,
//           image: values.imagePath || null,
//       });

//       if (supabaseError) {
//           toast.error("Error while uploading the recipe");
//           console.log(supabaseError.message);
//           return null;
//           //return toast.error(supabaseError.message);
//       }
      
//       console.log("Success");
//       return null;

//     }
//   } catch (error) {
//     toast.error("Something went wrong.");
//   }
// }


// setIsLoading(false);
// return null;