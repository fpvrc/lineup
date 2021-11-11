export const menu_upload = (muid: string) => {
  let options = {
    keyPrefix: `menus/${muid}/`,
    bucket: "octiblemedia",
    region: "us-west-1",
    accessKey: "AKIA4HZOXY7WXEHTRQY6",
    secretKey: "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",
    successActionStatus: 201,
    accelerate_url: "https://octiblemedia.s3-accelerate.amazonaws.com",
  };
  return options;
};

export const item_upload = (id: string) => {
  let options = {
    keyPrefix: `items/${id}/`,
    bucket: "octiblemedia",
    region: "us-west-1",
    accessKey: "AKIA4HZOXY7WXEHTRQY6",
    secretKey: "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",
    successActionStatus: 201,
    accelerate_url: "https://octiblemedia.s3-accelerate.amazonaws.com",
  };
  return options;
};

export const business_upload = (id: string) => {
  let options = {
    keyPrefix: `business/${id}/`,
    bucket: "octiblemedia",
    region: "us-west-1",
    accessKey: "AKIA4HZOXY7WXEHTRQY6",
    secretKey: "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",
    successActionStatus: 201,
    accelerate_url: "https://octiblemedia.s3-accelerate.amazonaws.com",
  };
  return options;
};

export const s3_upload = (prefix: string) => {
  let options = {
    keyPrefix: prefix,
    bucket: "octiblemedia",
    region: "us-west-1",
    accessKey: "AKIA4HZOXY7WXEHTRQY6",
    secretKey: "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",
    successActionStatus: 201,
    accelerate_url: "https://octiblemedia.s3-accelerate.amazonaws.com",
  };
  return options;
};
