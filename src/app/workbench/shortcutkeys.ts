/**
 * 全局快捷键实现
 */

// @ts-ignore
import $ from "jquery";

export class Shortcutkeys {
    readonly() {
        $(document).keypress(function (e) {
           console.log("1", e)
        })
    }
}
