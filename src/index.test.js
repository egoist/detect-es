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
