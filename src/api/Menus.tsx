import axios from "axios";
import config from "../lib/config.json";

export const addMenu = async (uid, menu_name, photo_uri) => {
  try {
    //Brewskies
    let res = await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
        query {
            menus(query: { }) {
             _id
             menu_name
            }
          }
            `,
      },
    });
    console.log(res.data);
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
