/**
 * 模板
 * 获取模板
 */

/**
 * name 简介名称
 * img 缩略图
 * path 简介地址
 * level 用户可见等级 0 所有人 1扩展 2会员
 */
let list = [
    {
        name: 'Blive经典模板',
        h: '',
        list: [
            {
                name: '红红火火',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb.png',
                path: '',
                level: 0,
                tag: ['官方','免费']
            },
            {
                name: '涂鸦深蓝',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-qingcl.png',
                path: '',
                level: 0,
                tag: ['官方','免费']
            }
        ],
    },
    {
        name: 'Bilibili壁纸模板',
        h: '简介背景引用官网或被改进过版本',
        list: [
            {
                name: '壁纸娘-树下绿荫',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-bizhinian1hao.png',
                path: '',
                level: 0,
                tag: ['官方','免费']

            },
            {
                name: '壁纸娘-流星',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-bizhinian2hao.png',
                path: '',
                level: 0,
                tag: ['官方','免费']
            },
            {
                name: '壁纸娘-通往新世界',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-bizhinian3hao.png',
                path: '',
                level: 0,
                tag: ['官方','免费']
            },
            {
                name: '秋色难分',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-bizhinian4hao.png',
                path: '',
                level: 0,
                tag: ['官方','免费']
            },
            {
                name: '简单就好',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-jiandanjhao.png',
                path: '',
                level: 1,
                tag: ['官方']
            }
        ],
    },
    {
        name: '包子系列',
        h: '来源于包子简介模板',
        list: [
            {
                name: '钢琴',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-ts8zsa-a.png',
                path: '',
                level: 0,
                tag: ['合作','免费']
            },
        ],
    },
    {
        name: '丸子系列',
        h: '来源于丸子简介模板',
        list: [
            {
                name: '丸子 2:3:3:2',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-wanzi-a.png',
                path: '',
                level: 0,
                tag: ['合作','免费','丸子']
            },
            {
                name: '丸子2:3(5:5):3(4:6):2',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-wanzi-a.png',
                path: '',
                level: 0,
                tag: ['合作','免费','丸子']
            },
            {
                name: '丸子1.9(5-5.5(5Y5))',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-wanzi-a.png',
                path: '',
                level: 0,
                tag: ['合作','免费','丸子']
            },
            {
                name: '丸子9:1',
                img: 'https://www.cabbagelol.net/blive/blive-4.0/img/moban/Cabb-wanzi-a.png',
                path: '',
                level: 0,
                tag: ['合作','免费','丸子']
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