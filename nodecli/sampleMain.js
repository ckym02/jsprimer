import { program } from "commander";
// Node.js標準モジュールのインポート
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html.js";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// // ファイルを非同期で読み込む
// fs.readFile(filePath).then(file => {
//     // Bufferインスタンス
//     console.log(file);
// });

// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  // md2htmlモジュールを使ってHTMLに変換する
  const html = md2html(file, cliOptions);
  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス1（一般的なエラー）としてプロセスを終了させる
  process.exit(1);
});

// /jsprimer/nodecli
// $ node sampleMain.js notfound.md
// ENOENT: no such file or directory, open 'notfound.md'