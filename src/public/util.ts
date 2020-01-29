/**
 * 工具
 */

export default {
    getQueryVariable(){
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        let map: any = {};
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if (pair[0] != "") {
                map[pair[0]] = pair[1];
            }
        }
        return map;
    },

    // 生成uuid
    getUUID(length: number) {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * (16) | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(length || 16);
        });
    },

    /**
     * 字符转换 首个字符转为大写
     */
    toWritingStyle(content: string) {
        if (content.toString().length <= 0) {
            return '';
        }
        return content.toLocaleLowerCase().replace(content.toLocaleLowerCase()[0], content.toLocaleLowerCase()[0].toLocaleUpperCase());
    }
}