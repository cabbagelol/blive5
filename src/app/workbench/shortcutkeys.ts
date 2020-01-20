/**
 * 全局快捷键实现
 */

// @ts-ignore
import $ from "jquery";

export class Shortcutkeys {
    async readonly(data) {
        $(document).keydown( (e) => {
            var e = e || event;
            var shiftKey = e.shiftKey || e.metaKey;
            var ctrlKey = e.ctrlKey || e.metaKey;

            console.log('e.keyCode', e.keyCode);

            if(shiftKey && ctrlKey && e.keyCode == 83) {
                // 保存
                data.resolve({
                    codekey: 0,
                });
            } else if (shiftKey && ctrlKey && e.keyCode == 65) {
                data.resolve({
                    codekey: 2,
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
                data.resolve({
                    codekey: 20,
                });
            } else if (altKey) {
                console.log("y");
                data.resolve({
                    codekey: 21,
                });
            }
        }).mousedown(e => {
            return false;
        });
    }
}
