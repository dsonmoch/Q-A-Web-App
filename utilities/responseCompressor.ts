const zlib = require("zlib");
const responseCompresser = (response: String) => {
  return new Promise(async (resolve, reject) => {
    var res : String = JSON.stringify(response);
    const compress = await zlib.gzip(res, (err: Error, result: String) => {
      if (err) throw err;
      return resolve(result);
    });
  });
};

export default responseCompresser;
