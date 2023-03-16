const fs = require("fs-extra");

const webpack = require("webpack");
const chalk = require("chalk");
const config = require("./webpack.prod.conf");

console.log(`start building......`);

const TARGET_NAME = process.argv[2];

config.mode = "production";

webpack(config, (err, stats) => {
    if (err) throw err;
    process.stdout.write(
        stats.toString({
            colors: true,
            modules: false,
            children: true,
            chunks: false,
            chunkModules: false,
        }) + "\n\n"
    );

    if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"));
        process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));

    // const src = "./dist";
    // const dest = "./temp/" + TARGET_NAME;
    // fs.copy(src, dest, (err) => {
    //     if (err) return console.error(err);
    //     fs.emptyDirSync(src);
    //     fs.copy("./temp/", src, (err) => {
    //         if (err) return console.error(err);
    //         fs.remove("./temp", (err) => {
    //             if (err) return console.error(err);
    //         });
    //     });
    //     // fs.copy("./res", src + "/res", (err) => {
    //     //     if (err) return console.error(err);
    //     // });
    // });
});
