import { program } from "commander";
// Node.js標準モジュールのインポート
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得する
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
    gfm: options.gfm ?? false,
};

// // ファイルを非同期で読み込む
// fs.readFile(filePath).then(file => {
//     // Bufferインスタンス
//     console.log(file);
// });

// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  // MarkdownファイルをHTML文字列に変換する
  const html = marked.parse(file, {
    // オプションの値を使用する
    gfm: cliOptions.gfm,
  });
  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス1（一般的なエラー）としてプロセスを終了させる
  process.exit(1);
});

// /jsprimer/nodecli
// $ node sampleMain.js notfound.md
// ENOENT: no such file or directory, open 'notfound.md'