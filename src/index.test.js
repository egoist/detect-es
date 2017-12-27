import { detect, types } from './'

test('const', async () => {
  const detective = await detect(`const a = 1`)
  expect(detective.has(types.CONST)).toBe(true)
})

test('let', async () => {
  const detective = await detect(`let a = 1`)
  expect(detective.has(types.LET)).toBe(true)
})

test('tagged template literal', async () => {
  const detective = await detect(`let a = foo\`ha\``)
  expect(detective.has(types.TAGGED_TEMPLATE_LITERAL)).toBe(true)
})

