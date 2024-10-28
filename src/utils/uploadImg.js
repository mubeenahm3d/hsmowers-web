import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

export default async function uploadImg(image, folderName) {
  if (image.data !== "") {
    const storage = getStorage();

    const storageRef = ref(storage, `${folderName}/${image.name}`);
    try {
      await uploadString(storageRef, image.data, "data_url");
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.log("error while uploading image", error);
    }
  }
}
