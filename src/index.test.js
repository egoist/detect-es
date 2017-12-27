import { parse, types } from './'

test('const', () => {
  const detective = parse(`const a = 1`)
  expect(detective.has(types.CONST)).toBe(true)
})

test('let', () => {
  const detective = parse(`let a = 1`)
  expect(detective.has(types.LET)).toBe(true)
})

test('tagged template literal', () => {
  const detective = parse(`let a = foo\`ha\``)
  expect(detective.has(types.TAGGED_TEMPLATE_LITERAL)).toBe(true)
})

test('class', () => {
  const detective = parse(`class Foo {}`)
  expect(detective.has(types.CLASS)).toBe(true)
})

test('arrow function', () => {
  const detective = parse(`const a = () => {}`)
  expect(detective.has(types.ARROW_FUNCTION)).toBe(true)
})

test('async/await', () => {
  expect(parse(`async function foo() {}`).has(types.ASYNC)).toBe(true)
  expect(parse(`const foo = async () => {}`).has(types.ASYNC)).toBe(true)
  expect(parse(`const foo = {async bar() {}}`).has(types.ASYNC)).toBe(true)
})

test('es module', () => {
  expect(parse(`import foo from 'foo'`).has(types.ES_MODULE)).toBe(true)
  expect(parse(`import {foo} from 'foo'`).has(types.ES_MODULE)).toBe(true)
  expect(parse(`export default {}`).has(types.ES_MODULE)).toBe(true)
  expect(parse(`export {foo}`).has(types.ES_MODULE)).toBe(true)
  expect(parse(`export const foo = {}`).has(types.ES_MODULE)).toBe(true)
})

test('dynamic import', () => {
  expect(parse(`import('foo')`).has(types.DYNAMIC_IMPORT)).toBe(true)
  expect(parse(`foo.import('foo')`).has(types.DYNAMIC_IMPORT)).toBe(false)
})

test('destructuring', () => {
  expect(parse(`let {a} = {a:1}`).has(types.DESTRUCTURING)).toBe(true)
  expect(parse(`let [a] = [1]`).has(types.DESTRUCTURING)).toBe(true)
  expect(parse(`function foo({a}) {}`).has(types.DESTRUCTURING)).toBe(true)
})

test('generator', () => {
  expect(parse(`function * foo() {}`).has(types.GENERATOR)).toBe(true)
  expect(parse(`const foo = {*bar() {}}`).has(types.GENERATOR)).toBe(true)
})

test('for..of', () => {
  expect(parse(`for (const a of b) {}`).has(types.FOR_OF)).toBe(true)
})

test('Object.assign', () => {
  expect(parse(`Object.assign()`).hasAPI('Object.assign')).toBe(true)
})

test('API', () => {
  expect(parse(`new Promise()`).hasAPI('Promise')).toBe(true)
  expect(parse(`new Proxy()`).hasAPI('Proxy')).toBe(true)
  expect(parse(`new Map()`).hasAPI('Map')).toBe(true)
  expect(parse(`new WeakMap()`).hasAPI('WeakMap')).toBe(true)
  expect(parse(`new Set()`).hasAPI('Set')).toBe(true)
  expect(parse(`new WeakSet()`).hasAPI('WeakSet')).toBe(true)
})
