var fs = require("fs/promises");
var path = require("path");

async function copy(from, to, isDir) {
  if (await exists(from)) {
    if (isDir || (await fs.stat(from)).isDirectory()) {
      await fs.mkdir(to, { recursive: true })
      let entries = await fs.readdir(from, { withFileTypes: true })

      for (let entry of entries) {
        let fromPath = path.join(from, entry.name)
        let toPath = path.join(to, entry.name)

        entry.isDirectory() ?
          await copy(fromPath, toPath, true) :
          await fs.copyFile(fromPath, toPath)
      }
    } else {
      return await fs.copyFile(from, to)
    }
  }
}

async function exists(path) {
  try {
    await fs.access(path)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

!(async ()=>{
  await fs.rm("dist", { recursive: true, force: true });
  await fs.mkdir("dist/");
  for (const frame of ["files", "other", "tlbdata", "css"]) {
    await copy(frame, "dist/" + frame);
  }
})()。catch(e=>console.log(e))
