import { getMyBusiness, addBusiness } from "../../api/Business";

export const doGetMyBusiness = (uid) => ({
  type: "GET_MY_BUSINESS",
  action: getMyBusiness(uid),
});

export const doAddBusiness = (uid, formData) => ({
  type: "ADD_BUSINESS",
  payload: addBusiness(uid, formData),
});

export const doRenderBusiness = (formData) => ({
  type: "RENDER_BUSINESS",
  payload: Promise.resolve(formData),
});
