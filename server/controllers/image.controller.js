import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Account from '../models/account.model';

/**
 * Return user by id
 * @param req
 * @param res
 * @returns {*}
 */
async function getImage(req, res) {
  try {
    const user = await Account.findById(req.params.id).populate('avatar');
    const image = user.avatar;

    if (image && image.data) {
      let base64 = image.data;
      base64 = base64.replace(/^data:image\/jpeg+;base64,/, "");
      base64 = base64.replace(/ /g, '+');
      let data = Buffer.from(base64, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length
      });
      return res.end(data);
    }
    const error = new APIError('Image not found!', httpStatus[400]);
    return res.send(error);
  }
  catch(e) {
    console.log(e);
    const error = new APIError('Server error!', httpStatus[400]);
    return res.send(error);
  }
}

export default { getImage };
