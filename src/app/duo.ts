const duo_api = require("@duosecurity/duo_api");

duo_api.Client.prototype.asyncApiCall = async function (
  method: any,
  path: any,
  params: any,
) {
  return new Promise((resolve, reject) => {
    try {
      this.jsonApiCall(method, path, params, resolve);
    } catch (error: any) {
      resolve({
        stat: "ERROR",
        message: error.message ? error.message : error,
      });
    }
  });
};

duo_api.Client.prototype.get = async function (path: any, params: any) {
  return this.asyncApiCall("GET", path, params);
};

duo_api.Client.prototype.post = async function (path: any, params: any) {
  return this.asyncApiCall("POST", path, params);
};

export const request = new duo_api.Client(
  process.env.IKEY,
  process.env.SKEY,
  process.env.HOST,
);
