const crypto = require('node:crypto');
const { Buffer } = require('node:buffer');
const iv = Buffer.from('0102030405060708');
const presetKey = Buffer.from('0CoJUm6Qyw8W8jud');
const linuxapiKey = Buffer.from('rFgB&h#%2?^eDg:Q');
const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----';
const eapiKey = 'e82ckenh8dichen8';
// Buffer.from 使用 0 范围内的 array 字节分配一个新的 Buffer – 255
const aesEncrypt = (buffer, mode, key, iv) => {
  //createCipheriv: algorithm 算法，key 密钥，iv 加密所用的向量
  const cipher = crypto.createCipheriv('aes-128-' + mode, key, iv);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
};
const rsaEncrypt = (buffer, key) => {
  //Buffer.alloc(size) 分配size个字符的新buffer
  buffer = Buffer.concat([Buffer.alloc(128 - buffer.length), buffer]);
  // publicEncrypt(key, buffer) 用key加密的新buffer
  // padding <crypto.constants>
  return crypto.publicEncrypt({ key: key, padding: crypto.constants.RSA_NO_PADDING }, buffer);
};
const weapi = (object) => {
  const text = JSON.stringify(object);
  const secretKey = crypto.randomBytes(16).map((n) => base62.charAt(n % 62).charCodeAt());

  //返回：firs aes两次加密；second rsa加密
  return {
    params: aesEncrypt(
      Buffer.from(aesEncrypt(Buffer.from(text), 'cbc', presetKey, iv).toString('base64')),
      'cbc',
      secretKey,
      iv
    ).toString('base64'),
    encSecKey: rsaEncrypt(secretKey.reverse(), publicKey).toString('hex'),
  };
};
const linuxapi = (object) => {
  const text = JSON.stringify(object);
  return {
    eparams: aesEncrypt(Buffer.from(text), 'ecb', linuxapiKey, '').toString('hex').toUpperCase(),
  };
};

const eapi = (url, object) => {
  const text = typeof object === 'object' ? JSON.stringify(object) : object;
  const message = `nobody${url}use${text}md5forencrypt`;
  const digest = crypto.createHash('md5').update(message).digest('hex');
  // 36cd479b6b5 ?
  const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
  return {
    params: aesEncrypt(Buffer.from(data), 'ecb', eapiKey, '').toString('hex').toUpperCase(),
  };
};

//解密
const decrypt = (cipherBuffer) => {
  const decipher = crypto.createDecipheriv('aes-128-ecb', eapiKey, '');
  return Buffer.concat([decipher.update(cipherBuffer), decipher.final()]);
};

module.exports = { weapi, linuxapi, eapi, decrypt };
