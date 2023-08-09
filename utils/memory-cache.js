function MemoryCache(){
  this.cache = {} //this指代运行时所在对象
  this.size = 0
}
MemoryCache.prototype.add = function (key, value, time, timeoutCallback){
  var old = this.cache[key];
  var instance = this; //运行时所在对象 memoryCache
  var entry = {
    value,
    expire: time + Date.now(), //到期
    timeout: setTimeout(function () { //超时
      instance.delete(key)
      return (
        timeoutCallback &&
        typeof timeoutCallback === 'function' &&
        timeoutCallback(value, key)
      )
    }, time),
  }
  this.cache[key] = entry
  this.size = Object.keys(this.cache).length;
  return entry;
}
MemoryCache.prototype.delete = function (key) {
  var entry = this.cache[key]

  if (entry) {
    clearTimeout(entry.timeout) //清除定时器
  }

  delete this.cache[key]

  this.size = Object.keys(this.cache).length

  return null
}
MemoryCache.prototype.get = function (key) {
  var entry = this.cache[key]

  return entry
}
MemoryCache.prototype.getValue = function (key) {
  var entry = this.get(key)

  return entry && entry.value // 返回enry.value
}
MemoryCache.prototype.clear = function () {
  Object.keys(this.cache).forEach(function (key) {
    this.delete(key)
  }, this)

  return true
}
module.exports = MemoryCache
