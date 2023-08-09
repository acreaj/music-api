module.exports = {
  toBoolean(val) {
    if (typeof val === 'boolean') return val;
    if (val === '') return val;
    return val === 'true' || val == '1';
  },
  cookieToJson(cookie) {
    if (!cookie) return {};
    let cookieArr = cookie.split(';');
    let obj = {};
    cookieArr.forEach((element) => {
      let arr = i.split('=');
      obj[arr[0]] = arr[1];
    });
    return obj;
  },
  getRandom(...params) {
    //floor 向下取整 random 随机数[0,1] pow(x,y) x的y次
    //var random = Math.floor(Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1);
    if ( params.length > 2) return;
    if ( params.length === 2) {
      let [start,end] = params;
      if ( start < end && start >= 0) {
        let gap = end-start;
        random = Math.floor(start+Math.random()*gap);
      }
    }
    if( params.length === 1) {
      let [end] = params;
      random = Math.floor(Math.random()*end);
    }
    return random;
  },
};
