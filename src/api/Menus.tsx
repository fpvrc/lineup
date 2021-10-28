import axios from "axios";
import config from "../lib/config.json";
import { menu_upload } from "../lib/S3";
import { RNS3 } from "react-native-upload-aws-s3";

export const addMenu = async (uid, formData) => {
  try {
    const { muid, main_photo, menu_name } = formData;
    const file = {
      uri: main_photo,
      name: "default",
      type: "photo",
    };
    const options = menu_upload(muid);
    let photo_res = await RNS3.put(file, options);
    const aws_loc = photo_res?.body?.postResponse?.location;
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
            mutation {
                insertOneMenu(data: {
                    muid: "${muid}"
                    uid: "${uid}"
                    menu_name: "${menu_name}"
                    main_photo: "${aws_loc}"
                }){
                    _id
                    muid
                    uid
                }
            }
        `,
      },
    })) as any;
    return res.data.data.insertOneMenu;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getMyMenus = async (uid) => {
  try {
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
          query {
            menus(query: {uid:"${uid}"}) {
              _id
                  main_photo
                  menu_name
                  muid
                  uid
            }
          }
        `,
      },
    })) as any;
    return res.data.data.menus;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
