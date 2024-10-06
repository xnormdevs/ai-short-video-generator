import axios from "axios";

export const extractInitials = (name: string) => {
  const nameParts = name.split(" ");
  return nameParts.map((word) => word[0]).join("");
};

export const convertImage = async (imageUrl: string) => {
  try {
    const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(res.data).toString("base64");
    return base64Image;
  } catch (err) {
    console.log("Error image converions : ", err);
  }
};
