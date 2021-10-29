import axios from "axios";
import config from "../lib/config.json";
import { menu_upload, item_upload } from "../lib/S3";
import { RNS3 } from "react-native-upload-aws-s3";

export const addMenu = async (uid, formData) => {
  try {
    const { muid, menu_name, main_photo, sections, items } = formData;
    if (main_photo) {
      const file = {
        uri: main_photo,
        name: "default",
        type: "photo",
      };
      const options = menu_upload(muid);
      await RNS3.put(file, options);
    }
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
            mutation insertOneMenu($muid: String!, $uid: String!, $menu_name: String!, $main_photo: String!, $sections: [MenuSectionInsertInput], $items: [MenuItemInsertInput]) {
                insertOneMenu(data: {
                    muid: $muid,
                    uid: $uid,
                    menu_name: $menu_name
                    main_photo: $main_photo
                    sections: $sections
                    items: $items
                }){
                    _id
                    muid
                    uid
                    menu_name
                    main_photo
                }
            }
        `,
        variables: {
          muid: muid,
          uid: uid,
          menu_name: menu_name,
          main_photo: main_photo,
          sections: sections,
          items: items,
        },
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
              sections {
                id
                title
              }
    					items {
                id
                title
                sub_title
                price
                section
                photo
              }
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

export const uploadItemPhoto = async (id, photo_uri) => {
  try {
    const file = {
      uri: photo_uri,
      name: "default",
      type: "photo",
    };
    const options = item_upload(id);
    let photo_res = await RNS3.put(file, options);
    return photo_res?.body?.postResponse?.location;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getMenus = async () => {
  try {
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
          query {
            menus(query: {}) {
              _id
              main_photo
              menu_name
              muid
              uid
              sections {
                id
                title
              }
    					items {
                id
                title
                sub_title
                price
                section
                photo
              }
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
