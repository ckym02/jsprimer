// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

export function md2html(markdown, cliOptions) {
    // MarkdownファイルをHTML文字列に変換する
    return marked.parse(markdown, {
        gfm: cliOptions.gfm,
    });
};
