const {htmlStringToObject} = require('.')
const fs = require('fs/promises');

if ( process.argv.length < 4 ){
  console.log("Please input the source file and target file correctly.")
  process.exit(1);
}

const src = process.argv[2]
const dst = process.argv[3]
const main = async () => {
  let data
  try {
    data = await fs.readFile(__dirname  + '/' + src, {encoding: 'utf-8'});
  } catch(err) {
    try {
      data = await fs.readFile(src, {encoding: 'utf-8'});
    } catch(err) {
      console.log(`Couldn't find the file "${src}"`)
      process.exit(1)
    }
  }

  let res = htmlStringToObject(data)
  try {
    await fs.writeFile(__dirname + '/' + dst, res)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}
main()