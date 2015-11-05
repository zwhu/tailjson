/**
 * Created by zwhu on 15/11/5.
 */

//TODO: exclude file object
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isObject = function isObject(o) {
  var type = typeof o;
  return !!o && 'object' === type;
};

/**
 * 平铺json的方法
 * 如:
 * ```js
 * let o  = {
 *  'a' : {
 *    'b' : {
 *      c: 1
 *    }
 *  }
 * }
 *
 * tailJson2SinLayer(o) // => {'a_b_c' : 1}
 *
 * ```
 * @param {object} json
 * @returns {object}
 */
var tail2SinLayer = function tail2SinLayer(json, separate) {
  if (!isObject(json)) throw new Error('arguments must object');
  var newJson = {};

  function f(o, r) {
    var keys = Object.keys(o);
    if (0 === keys.length) newJson[r] = o;
    keys.forEach(function (key) {
      var k = key;
      if (r) k = '' + r + separate + key;
      if (isObject(o[key])) {
        f(o[key], k);
      } else {
        newJson[k] = o[key];
      }
    });
  }

  f(json);

  return newJson;
};

exports.tail2SinLayer = tail2SinLayer;
/**
 * 解回如上结构
 * @param {object} json
 * @returns {object}
 */
var tail2MulLayer = function tail2MulLayer(json, separate) {

  if (!isObject(json)) throw new Error('arguments must object');

  var newJson = {};

  Object.keys(json).forEach(function (key) {
    if (key.includes(separate)) {
      (function () {
        var cks = key.split(separate),
            v = json[key];

        cks.reduce(function (p, c, index) {
          if (!Array.isArray(p)) p[c] = p[c] || {};
          if (cks.length - 1 === index) {
            if (Number.isInteger(Number(c))) {
              return p.push(v);
            } else p[c] = v;
          }

          if (cks.length - 2 === index) {
            if (Number.isInteger(Number(cks[index + 1])) && !Array.isArray(p[c])) {
              p[c] = [];
            }
          }

          return p[c];
        }, newJson);
      })();
    } else newJson[key] = json[key];
  });

  return newJson;
};
exports.tail2MulLayer = tail2MulLayer;