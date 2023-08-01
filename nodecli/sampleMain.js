import { program } from "commander";
// Node.js標準モジュールのインポート
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// // ファイルを非同期で読み込む
// fs.readFile(filePath).then(file => {
//     // Bufferインスタンス
//     console.log(file);
// });

// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  console.log(file);
  // MarkdownファイルをHTML文字列に変換する
  const html = marked.parse(file);
  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス1（一般的なエラー）としてプロセスを終了させる
  process.exit(1);
});

// /jsprimer/nodecli
// $ node sampleMain.js notfound.md
// ENOENT: no such file or directory, open 'notfound.md'