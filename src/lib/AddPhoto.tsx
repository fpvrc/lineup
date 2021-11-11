import { launchImageLibrary } from "react-native-image-picker";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

export const addPhoto = async () => {
  try {
    const promise = new Promise((resolve, reject) => {
      launchImageLibrary(options as any, (res: any) => {
        if (res.didCancel) {
          reject(new Error("User cancelled image picker"));
        } else if (res.errorMessage) {
          reject(new Error(res.errorMessage));
        } else {
          const source = res.assets[0]?.uri;
          resolve(source);
        }
      });
    });
    let uri = await promise;
    return uri;
  } catch (error) {}
};
