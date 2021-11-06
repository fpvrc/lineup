import config from "../lib/config.json";
import { menu_upload, business_upload } from "../lib/S3";
import { RNS3 } from "react-native-upload-aws-s3";
import axios from "axios";
import { Alert } from "react-native";

export const uploadBusinessPhoto = async (id, photo_uri) => {
  try {
    const file = {
      uri: photo_uri,
      name: "default",
      type: "photo",
    };
    const options = business_upload(id);
    let photo_res = await RNS3.put(file, options);
    return photo_res?.body?.postResponse?.location;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getMyBusiness = async (uid) => {
  try {
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
          query {
            my_businesses (query:{ uid: "${uid}"}){
              buid{
                buid
                name
                photo
                description
              }
            }
          }
          `,
      },
    })) as any;
    return res.data.data.my_businesses;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const addBusiness = async (uid, formData) => {
  try {
    const file = {
      uri: formData.photo,
      name: "default",
      type: "photo",
    };
    const options = business_upload(formData.buid);
    const [res, aws] = await Promise.all([
      axios({
        url: (config as any).GRAPH,
        method: "post",
        data: {
          query: `
                mutation insertOneMy_business($uid: String!, $buid: String!, $name: String!, $description: String!, $photo: String!) {
                  insertOneMy_business(data: {uid: $uid, buid:{
                  create:{ buid: $buid, name: $name, description: $description, photo: $photo} }}){
                    uid
                    buid{
                      _id
                      buid
                      name
                      description
                      photo
                    }
                  }
                }
                    `,
          variables: {
            uid: uid,
            buid: formData.buid,
            name: formData.name,
            description: formData.description,
            photo: formData.photo,
          },
        },
      }) as any,
      RNS3.put(file, options),
    ]);
    return res.data.data.insertOneMy_business.buid;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
