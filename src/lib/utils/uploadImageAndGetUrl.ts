import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

const uploadImageAndGetUrl = async (image: File) => {
  if (typeof image === "string") return console.log("file만 받을 수 있습니다");

  try {
    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await sendAxiosRequest({
      method: "POST",
      url: "/images/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url;
  } catch (error) {
    alert(`Error uploading image: ${error}`);
    throw error;
  }
};

export default uploadImageAndGetUrl;
