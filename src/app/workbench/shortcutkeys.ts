/**
 * 全局快捷键实现
 */

// @ts-ignore
import $ from "jquery";

export class Shortcutkeys {
    async readonly() {
        return new Promise((resolve, reject) => {
            $(document).keydown( (e) => {
                var e = e || event;
                var shiftKey = e.shiftKey || e.metaKey;
                var ctrlKey = e.ctrlKey || e.metaKey;

                if(shiftKey && ctrlKey && e.keyCode == 83) {
                    // 保存
                    console.log("保存");
                    resolve({
                        codekey: 0,
                    });
                } else if (shiftKey && ctrlKey && e.keyCode == 85) {
                    console.log("保存");
                    resolve({
                        codekey: 10,
                    });
                }
            }).on("mousewheel DOMMouseScroll", function (e) {
                var e = e || event;
                var shiftKey = e.shiftKey || e.metaKey;
                var altKey = e.altKey || e.metaKey;

                // const delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
                //     // chrome & ie
                //     (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
                if (shiftKey) {
                    console.log("x" + e.originalEvent.detail);
                    resolve({
                        codekey: 20,
                    });
                } else if (altKey) {
                    console.log("y");
                    resolve({
                        codekey: 21,
                    });
                }
            }).mousedown(e => {
                return false;
            });
        })
    }
}
