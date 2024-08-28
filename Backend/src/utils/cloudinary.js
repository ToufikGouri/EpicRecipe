import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, folderName) => {

    try {
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto",
                folder: folderName,
            }
        )
        // remove the locally saved temporary file after the upload operation
        fs.unlinkSync(localFilePath)
        return response.secure_url

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default uploadOnCloudinary


export const getImageUrlsFromFolder = async (folderPath) => {
    try {
        const result = await cloudinary.search
            .expression(`folder:${folderPath} AND resource_type:image`) // Correctly specify the folder path
            .sort_by('public_id', 'asc')
            .execute();

        // Extract URLs from the image resources
        const imageUrls = result.resources.map((image) => image.url);

        return imageUrls;
    } catch (error) {
        console.error('Error fetching image URLs:', error.message);
        throw error;
    }
};