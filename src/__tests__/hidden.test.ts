// This is weird, but it works. The native module thing is kinda picky :/
import { isHiddenFile } from '../../lib/cjs/index.js';
import * as path from 'path';
import { platform } from 'os';
import { cwd } from 'process';

test('Is .git folder hidden?', () => {
  expect(isHiddenFile(path.join(__dirname, '..', '..', '.git'))).toBe(true);
});

test('Is src folder hidden?', () => {
  expect(isHiddenFile(path.join(__dirname, '..'))).toBe(false);
  expect(isHiddenFile(path.join(__dirname, '..', '..', 'src'))).toBe(false);
});
const isWin = platform() === 'win32';

test('A bunch more intersting tests than just those two', () => {
  expect(isHiddenFile('.')).toBe(false);
  expect(isHiddenFile('..')).toBe(false);
  if (isWin) {
    // On Windows, this checks actual file attributes
    process.chdir('src/__tests__');
  } else {
    // For *nix platforms, check for root directory stuff
    expect(isHiddenFile('/.')).toBe(false);
    expect(isHiddenFile('/..')).toBe(false);
    expect(isHiddenFile('/.c')).toBe(true);
    expect(isHiddenFile('/..d')).toBe(true);
    expect(isHiddenFile('/a.c')).toBe(false);
    expect(isHiddenFile('/a..c')).toBe(false);
    expect(isHiddenFile('/.a.c')).toBe(true);
    expect(isHiddenFile('/.a..c')).toBe(true);
  }
  expect(isHiddenFile('.a')).toBe(!isWin);
  expect(isHiddenFile('..b')).toBe(!isWin);
  expect(isHiddenFile('a.')).toBe(false);
  expect(isHiddenFile('b.a')).toBe(false);
  expect(isHiddenFile('.a.')).toBe(!isWin);
  expect(isHiddenFile('.b.a')).toBe(!isWin);
  expect(isHiddenFile('./a.')).toBe(false);
  expect(isHiddenFile('../b.a')).toBe(false);
  expect(isHiddenFile('..a/a.c')).toBe(false);
  expect(isHiddenFile('.b/a..c')).toBe(false);
});
