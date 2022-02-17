const { Parcel, createWorkerFarm } = require("@parcel/core");
const { MemoryFS } = require("@parcel/fs");

let workerFarm = createWorkerFarm();
let outputFS = new MemoryFS(workerFarm);

let bundler = new Parcel({
  entries: "index.html",
  defaultConfig: "@parcel/config-default",
  workerFarm,
  outputFS
});

async function runBuild() {
  try {
    let { bundleGraph } = await bundler.run();

    for (let bundle of bundleGraph.getBundles()) {
      console.log(bundle.filePath);
      console.log(await outputFS.readFile(bundle.filePath, "utf8"));
    }
  } finally {
    await workerFarm.end();
  }
}

runBuild()

