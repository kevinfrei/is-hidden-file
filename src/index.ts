/**
 * Check whether a file/folder is hidden on system
 * original author Justin Maximillian Kimlim <kimlimjustin@gmail.com>
 * I fixed bugs. Many many bugs.
 * @author Kevin Frei <kevinfrei@hotmail.com>
 * @license MIT
 * @param {string} path - file/folder absolute path
 * @returns {boolean} Result
 */

type hiddenFileType = (path: string) => boolean;

export function isHiddenFile(path: string): boolean {
  if (process.platform === 'win32') {
    const winHidden: hiddenFileType =
      require('../build/Release/is-win32-hidden') as hiddenFileType;
    return winHidden(path);
  } else {
    // Regex's are awful, and unmaintainllable, and with a passable JIT, not
    // at all faster than just running this very simple code

    // If there's no '/' it returns -1, so we start at 0 :)
    const ofs: number = path.lastIndexOf('/') + 1;
    // If we have no basename, or if the first character isn't a dot,
    // it's not hidden
    if (path.length <= ofs || path[ofs] !== '.') {
      return false;
    }
    // We're starting with a '.' so we just need to check for dirs
    return path.length > ofs + 1 || path[ofs + 1] !== '.';
  }
}
