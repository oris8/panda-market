import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

export const uploadImageAndGetUrl = async (image: string) => {
  try {
    const form = new FormData();
    form.append("image", image);

    const response = await sendAxiosRequest({
      method: "POST",
      url: "/images/upload",
      data: form,
    });
    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
