const { isHiddenFile } = require('../index');
const path = require('path');

test('Is .git folder hidden?', () => {
  expect(isHiddenFile(path.join(__dirname, '..','..','.git'))).toBe(true);
});

test('Is src folder hidden?', () => {
  expect(isHiddenFile(path.join(__dirname, '..'))).toBe(false);
  expect(isHiddenFile(path.join(__dirname, '..', '..', src))).toBe(false);
});

test('A bunch more intersting tests than just those two', () => {
  expect(isHiddenFile('.')).toBe(false);
  expect(isHiddenFile('..')).toBe(false);
  expect(isHiddenFile('/.')).toBe(false);
  expect(isHiddenFile('/..')).toBe(false);
  expect(isHiddenFile('.a')).toBe(true);
  // expect(isHiddenFile('..b')).toBe(true);
  expect(isHiddenFile('/.c')).toBe(true);
  // expect(isHiddenFile('/..d')).toBe(true);
  expect(isHiddenFile('a.')).toBe(false);
  expect(isHiddenFile('b.a')).toBe(false);
  expect(isHiddenFile('/a.c')).toBe(false);
  expect(isHiddenFile('/a..c')).toBe(false);
  expect(isHiddenFile('.a.')).toBe(true);
  expect(isHiddenFile('.b.a')).toBe(true);
  expect(isHiddenFile('/.a.c')).toBe(true);
  expect(isHiddenFile('/.a..c')).toBe(true);
  expect(isHiddenFile('./a.')).toBe(false);
  expect(isHiddenFile('../b.a')).toBe(false);
  expect(isHiddenFile('..a/a.c')).toBe(false);
  // expect(isHiddenFile('.b/a..c')).toBe(false);
});