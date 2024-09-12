import React, { useState } from 'react'
import defaultRecipeImage from "../../assets/AddRecipe.png"
import { Loading, modal, toast } from '../../myTools'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import axios from 'axios'

const AddRecipe = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(defaultRecipeImage)
    const [ingredients, setIngredients] = useState(["", "", ""])
    const [directions, setDirections] = useState(["", "", ""])
    const [category, setCategory] = useState("")
    const [servings, setServings] = useState("")
    const [prepTime, setPrepTime] = useState("")

    const handleResetFields = () => {
        setTitle("")
        setDesc("")
        setImage("")
        setImagePreview(defaultRecipeImage)
        setIngredients(["", "", ""])
        setDirections(["", "", ""])
        setCategory("")
        setServings("")
        setPrepTime("")
    }

    const handleSubmitRecipe = async (e) => {

        if (!title) { toast.fire({ icon: "warning", title: "Please enter title" }); return }
        if (!ingredients[0]) { toast.fire({ icon: "warning", title: "Please enter ingredients" }); return }
        if (!directions[0]) { toast.fire({ icon: "warning", title: "Please enter directions" }); return }

        const formData = new FormData()

        formData.append("title", title.trim())
        formData.append("ingredients", JSON.stringify(ingredients))
        formData.append("directions", JSON.stringify(directions))
        if (desc) formData.append("description", desc.trim())
        if (image) formData.append("image", image)
        if (prepTime) formData.append("preparationTime", prepTime)
        if (servings) formData.append("servings", servings)
        if (category) formData.append("category", category)


        Loading("Adding Recipe")
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/addrecipe`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            Loading().close()
            toast.fire({
                icon: "success",
                title: "Recipe added successfully"
            })

            handleResetFields()
        } catch (error) {
            Loading().close()
            toast.fire({
                icon: "error",
                title: `${error.response?.data?.message || "Failed To add recipe"}`
            })
            console.log(error);

        }



    }

    const handleRecipeImage = (e) => {
        const file = e.target.files[0]
        setImage(file)

        // Create an object URL for the selected file to preview
        const imageUrl = URL.createObjectURL(file);

        // revoke the object URL if already exists
        if (imageUrl) {
            URL.revokeObjectURL(image)
        }
        setImagePreview(imageUrl)
    }


    return (
        <>
            <section className='p-6'>

                {/* Headings */}
                <div className="headings">
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl font-bold'>Add a Recipe</h1>
                    <p className='sm:text-xl mt-3 my-1'>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the EpicRecipes community.</p>
                </div>

                {/* Recipe inputs */}
                <div className='mt-6 space-y-6'>
                    {/* Title, Description & Image */}
                    <div className='flex max-md:flex-col justify-between'>
                        <div className='space-y-6 md:w-3/5'>
                            <div className='input-title'>
                                <label htmlFor='recipeTitle' className='font-bold text-xl block'>Recipe Title</label>
                                <input id='recipeTitle' type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='p-2 outline-primaryBlue w-full border-2 border-black' placeholder='Give your recipe a title' />
                            </div>
                            <div className='input-desc'>
                                <label htmlFor='recipeDesc' className='font-bold text-xl block'>Recipe Description</label>
                                <textarea id="recipeDesc" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} className='p-2 outline-primaryBlue w-full border-2 border-black' placeholder="Share the story behind your recipe and what makes it special." />
                            </div>
                        </div>
                        <div className='input-image max-md:self-center'>
                            <p className='font-bold text-xl text-center'>Recipe Image (optional)</p>
                            <img src={imagePreview} alt={"Recipe Image"} className='size-64 rounded-full object-contain border border-primaryGrey' />
                            <input onChange={(e) => handleRecipeImage(e)} type="file" accept='image/*' id="recipeImage" className='hidden' />
                            {!image ?
                                <label htmlFor='recipeImage' className='w-full mt-4 primaryBtn rounded-none cursor-pointer'>Select</label>
                                :
                                <button onClick={() => { setImage(""); setImagePreview(defaultRecipeImage) }} className='w-full mt-2 p-1.5 px-5 font-bold uppercase border-2 border-black hover:bg-gray-200'>Cancel</button>
                            }
                        </div>
                    </div>

                    <div className="Divider border border-secondaryGrey"></div>

                    {/* Ingredients */}
                    <div>
                        <h1 className='font-bold text-xl block'>Ingredients</h1>
                        <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped).</p>
                        <div className='my-6 space-y-3'>
                            {
                                ingredients.map((val, ind) =>
                                    <div key={ind} className='flex justify-between items-center'>
                                        {/* Ingredient input lists */}
                                        <input type="text" value={val} className='w-11/12 p-2 outline-primaryBlue border-2 border-black' placeholder={`e.g Ingredient ${ind + 1}`}
                                            onChange={(e) => {
                                                const oldIngredients = [...ingredients];
                                                oldIngredients[ind] = e.target.value;
                                                setIngredients(oldIngredients)
                                            }} />
                                        {/* Delete btn */}
                                        {ingredients.length > 1 &&
                                            <button className='hover:text-primaryRed'
                                                onClick={() => {
                                                    const oldIngredients = ingredients.filter((v, i) => i !== ind);
                                                    setIngredients(oldIngredients);
                                                }} >
                                                <XCircleIcon />
                                            </button>}
                                    </div>
                                )
                            }
                        </div>
                        {/* Add input list btn */}
                        <button onClick={() => setIngredients([...ingredients, ""])} className="primaryBtn rounded-none">Add Ingredient &nbsp;<PlusIcon /></button>
                    </div>

                    <div className="Divider border border-secondaryGrey"></div>

                    {/* Direction */}
                    <div>
                        <h1 className='font-bold text-xl block'>Directions</h1>
                        <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.</p>
                        <div className='my-6 space-y-3'>
                            {
                                directions.map((val, ind) =>
                                    <div key={ind}>
                                        <h1>Step {ind + 1}</h1>
                                        <div className='mt-2 flex justify-between items-center'>
                                            {/* Direction input lists */}
                                            <input type="text" value={val} className='w-11/12 p-2 outline-primaryBlue border-2 border-black' placeholder={`Explain step ${ind + 1}`}
                                                onChange={(e) => {
                                                    const oldDirections = [...directions];
                                                    oldDirections[ind] = e.target.value;
                                                    setDirections(oldDirections)
                                                }} />
                                            {/* Delete btn */}
                                            {directions.length > 1 &&
                                                <button className='hover:text-primaryRed'
                                                    onClick={() => {
                                                        const oldDirections = directions.filter((v, i) => i !== ind);
                                                        setDirections(oldDirections);
                                                    }} >
                                                    <XCircleIcon />
                                                </button>}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {/* Add input list btn */}
                        <button onClick={() => setDirections([...directions, ""])} className="primaryBtn rounded-none">Add Step &nbsp;<PlusIcon /></button>
                    </div>

                    <div className="Divider border border-secondaryGrey"></div>

                    {/* Category, Servings & Preparation Time */}
                    <div className='space-y-6'>
                        <div className="input-category flex items-center justify-between space-x-6">
                            <label htmlFor='recipeCategory' className='font-bold text-xl block'>Category</label>
                            <input id='recipeCategory' type="text" value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 outline-primaryBlue w-2/4 border-2 border-black' placeholder='eg. Pasta' />
                        </div>
                        <div className="input-servings flex items-center justify-between space-x-6">
                            <label htmlFor='recipeServings' className='font-bold text-xl block'>Servings</label>
                            <input id='recipeServings' type="text" value={servings} onChange={(e) => setServings(e.target.value)} className='p-2 outline-primaryBlue w-2/4 border-2 border-black' placeholder='eg. 8' />
                        </div>
                        <div className="input-preptime flex items-center justify-between space-x-6">
                            <label htmlFor='recipePrepTime' className='font-bold text-xl block'>Preparation Time (in mins)</label>
                            <input id='recipePrepTime' type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className='p-2 outline-primaryBlue w-2/4 border-2 border-black' placeholder='eg. 30' />
                        </div>
                    </div>

                    <div className="Divider border border-secondaryGrey"></div>

                    <div className="finatBtn flex justify-end">
                        <button onClick={() => modal("Cancel adding recipe?", "Confirm", "Cancel", "red").then(val => val.isConfirmed && handleResetFields())} className='p-2 px-5 uppercase border-2 border-black hover:bg-gray-200'>Cancel</button>
                        <button onClick={handleSubmitRecipe} className='w-44 mx-1 primaryBtn rounded-none'>Submit Recipe</button>
                    </div>

                </div>

            </section >
        </>
    )
}

export default AddRecipe