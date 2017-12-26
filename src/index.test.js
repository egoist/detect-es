import { detect, types } from './'

test('const', async () => {
  const detective = await detect(`const a = 1`)
  expect(detective.has(types.CONST)).toBe(true)
})
