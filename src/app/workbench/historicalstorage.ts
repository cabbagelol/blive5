/**
 * 历史简介储存
 */
import {LocalStorage} from '../../public/localStorage';

export class Historicalstorage {
    private saveName: string = 'blive.historicalstorage';

    /**
     * 保存文件
     * @param id
     * @param html
     */
    save(id: string, html: string) {
        const self = this;
        const list = LocalStorage.getObject(self.saveName);

        if (html.toString().length <= 0) {
            return;
        }

        if (Object.keys(list).length > 0) {

            // 从路由地址未找到id时重新创建
            list.list.push({
                'name': '',
                'id': !id ? self.getUUID(16) : id,
                'html': html,
                'time': new Date().getTime()
            });
            LocalStorage.setObject(self.saveName, {
                'list': list.list
            });
        } else {

            // 储存器首次未初始时
            LocalStorage.setObject(self.saveName, {
                'list': [{
                    'name': '',
                    'id': id,
                    'html': html,
                    'time': new Date().getTime()
                }]
            });
        }
    }

    /**
     * 查询简介
     * 如果没有表示false
     */
    query(id: any) {
        const self = this;
        const list = self.getList();
        var i_;

        if (list.list.length <= 0) {
            return;
        }

        console.log(list.list)

        list.list.forEach(i => {
            if (i.id == id) {
                i_ = i;
            }
        });

        return i_ || false;
    }

    /**
     * 删除简介
     */
    static delete(id: any) {
        const self = this;

        return new Promise((r,e) => {
            var list = LocalStorage.getObject('blive.historicalstorage');
                list = Object.keys(list).length == 0 ? {list: []} : list;

            list.list.forEach((i,index) => {
                if (i.id == id) {
                    list.list.splice(index, 1);
                }
            });

            LocalStorage.setObject('blive.historicalstorage', Object.assign(LocalStorage.getObject('blive.historicalstorage'), list));

            r(true)
        })
    }

    /**
     * 查询当前储存列表长度
     */
    static onQueryListLength () {
        var list = LocalStorage.getObject('blive.historicalstorage');
        return list.list.length;
    }

    /**
     * 获取简介列表
     */
    getList() {
        const self = this;
        const list = LocalStorage.getObject(self.saveName);
        return Object.keys(list).length == 0 ? {list: []} : list;
    }


    // 生成uuid
    getUUID(length: number) {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(length || 16);
        });
    }
}
