const fs = require('fs');

const customFlag = '-session=';
let filename = process.argv.find(el => el.startsWith(customFlag));
if (!filename) {
  console.log('file not found')
} else {
  filename = filename.slice(customFlag.length)
}

const file = fs.readFileSync(`tmp/${filename}`, 'utf8')
const code = file.toString();

test('react output', async () => {
  await page.setContent(code);
  const text = await page.$eval('.greeter', e => e.innerHTML);
  expect(text).toBe('Hello Admin');
});

test('change prop', async () => {
  await page.setContent(code.replace('user="Admin"', 'user="Foo"'));
  const text = await page.$eval('.greeter', e => e.innerHTML);
  expect(text).toBe('Hello Foo');
});
