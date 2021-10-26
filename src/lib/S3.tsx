export const menu_upload = (group_id: string, messageID: string) => {
  let options = {
    keyPrefix: `rightnow/${group_id}/${messageID}/`,
    bucket: 'denmedia',
    region: 'us-east-1',
    accessKey: 'AKIAQTJ6PNP2I4SO3SET',
    secretKey: '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',
    successActionStatus: 201,
    accelerate_url: 'https://denmedia.s3-accelerate.amazonaws.com',
  };
  return options;
};
