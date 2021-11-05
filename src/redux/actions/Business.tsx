import { getMyBusiness, addBusiness } from "../../api/Business";

export const doGetMyBusiness = (uid) => ({
  type: "GET_MY_BUSINESS",
  action: getMyBusiness(uid),
});

export const doAddBusiness = (uid, formData) => ({
  type: "ADD_BUSINESS",
  payload: addBusiness(uid, formData),
});
