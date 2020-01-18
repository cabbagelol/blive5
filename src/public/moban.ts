/**
 * 模板
 * 获取模板
 */

let list = [
    {
        name: 'Blive经典模板',
        h: '',
        list: [
            {
                name: '红红火火',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '涂鸦深蓝',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            }
        ],
    },
    {
        name: 'Bilibili壁纸模板',
        h: '简介背景引用官网或被改进过版本',
        list: [
            {
                name: '壁纸娘-树下绿荫',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '壁纸娘-流星',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '壁纸娘-通往新世界',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '秋色难分',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            }
        ],
    },
    {
        name: '包子系列',
        h: '来源于包子简介模板',
        list: [
            {
                name: '钢琴',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
        ],
    },
    {
        name: '丸子系列',
        h: '来源于丸子简介模板',
        list: [
            {
                name: '丸子 2:3:3:2',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '丸子2:3(5:5):3(4:6):2',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '丸子1.9(5-5.5(5Y5))',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
            {
                name: '丸子9:1',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-unll.png',
                path: '',
            },
        ],
    }
];

export default class moban {
    /**
     * 获取模板列表
     * TODO 之后做成接口
     */
    static getMobanList () {
        return list;
    }
};