import {
  getMyBusiness,
  addBusiness,
  uploadMain,
  uploadCover,
} from "../../api/Business";

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

export const doClearStepOne = () => ({
  type: "CLEAR_STEP_ONE",
  payload: Promise.resolve(),
});

export const doStepOne = (formData) => ({
  type: "STEP_ONE",
  payload: Promise.resolve(formData),
});

export const doUploadMain = (uri, photo) => ({
  type: "UPLOAD_MAIN",
  payload: uploadMain(uri, photo),
});

export const doUploadCover = (uri, photo) => ({
  type: "UPLOAD_COVER",
  payload: uploadCover(uri, photo),
});
