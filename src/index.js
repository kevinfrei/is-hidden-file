"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Check whether a file/folder is hidden on system
 * @author Justin Maximillian Kimlim <kimlimjustin@gmail.com>
 * @license MIT
 * @param {string} path - file/folder absolute path
 * @returns {boolean} Result
*/

function isHiddenFile(path) {
  if (process.platform === "win32") {
    const winHidden = require('../build/Release/is-win32-hidden');
    return winHidden(path);
  } else {
    return /(^|\/)\.[^\/\.]/g.test(path)
  }
}

exports.isHiddenFile = isHiddenFile