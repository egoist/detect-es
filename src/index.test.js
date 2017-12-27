import { detect, types } from './'

test('const', () => {
  const detective = detect(`const a = 1`)
  expect(detective.has(types.CONST)).toBe(true)
})

test('let', () => {
  const detective = detect(`let a = 1`)
  expect(detective.has(types.LET)).toBe(true)
})

test('tagged template literal', () => {
  const detective = detect(`let a = foo\`ha\``)
  expect(detective.has(types.TAGGED_TEMPLATE_LITERAL)).toBe(true)
})

test('class', () => {
  const detective = detect(`class Foo {}`)
  expect(detective.has(types.CLASS)).toBe(true)
})

test('arrow function', () => {
  const detective = detect(`const a = () => {}`)
  expect(detective.has(types.ARROW_FUNCTION)).toBe(true)
})

test('async/await', () => {
  expect(detect(`async function foo() {}`).has(types.ASYNC)).toBe(true)
  expect(detect(`const foo = async () => {}`).has(types.ASYNC)).toBe(true)
  expect(detect(`const foo = {async bar() {}}`).has(types.ASYNC)).toBe(true)
})

test('es module', () => {
  expect(detect(`import foo from 'foo'`).has(types.ES_MODULE)).toBe(true)
  expect(detect(`import {foo} from 'foo'`).has(types.ES_MODULE)).toBe(true)
  expect(detect(`export default {}`).has(types.ES_MODULE)).toBe(true)
  expect(detect(`export {foo}`).has(types.ES_MODULE)).toBe(true)
  expect(detect(`export const foo = {}`).has(types.ES_MODULE)).toBe(true)
})

test('dynamic import', () => {
  expect(detect(`import('foo')`).has(types.DYNAMIC_IMPORT)).toBe(true)
  expect(detect(`foo.import('foo')`).has(types.DYNAMIC_IMPORT)).toBe(false)
})

test('destructuring', () => {
  expect(detect(`let {a} = {a:1}`).has(types.DESTRUCTURING)).toBe(true)
  expect(detect(`let [a] = [1]`).has(types.DESTRUCTURING)).toBe(true)
  expect(detect(`function foo({a}) {}`).has(types.DESTRUCTURING)).toBe(true)
})

test('generator', () => {
  expect(detect(`function * foo() {}`).has(types.GENERATOR)).toBe(true)
  expect(detect(`const foo = {*bar() {}}`).has(types.GENERATOR)).toBe(true)
})

test('for..of', () => {
  expect(detect(`for (const a of b) {}`).has(types.FOR_OF)).toBe(true)
})
