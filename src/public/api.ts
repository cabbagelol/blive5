/**
 * 全局属性配置表
 */

export default {
    url: '',

    /**
     * 程序版本
     */
    appVersion: '5.0.1 beta',

    imgagesApi: [
        {
            name: '线路一',
            url: 'https://api.uomg.com/api/image.juejin', // 掘金社区
        },
        {
            name: '线路二',
            url: 'https://api.uomg.com/api/image.sogou' // 搜狗
        },
        {
            name: '线路三',
            url: 'https://api.uomg.com/api/image.360' // 奇虎
        },
        {
            name: '线路四',
            url: 'https://api.uomg.com/api/image.sina' // 新浪
        },
        {
            name: '线路五',
            url: 'https://api.uomg.com/api/image.jd' // 京东
        }
    ],

    /**
     * 可用的标签名单
     * 包含的标签稳定可靠，不会被过滤
     * 如果不存在于白名单和黑名单的标签未未知标签,工具会通过选择器提示用户
     * attr: Array 可支持的面板屬性
     * 
     * -----------------------------------
     * 屬性描述:
     * size 大小面板
     * backround 背景面板
     * typography 文字属性面板
     * spacing 外边距面板
     */
    elementWhiteList: {
        'div': {
            'attr': ['size','background','spacing'],
        },
        'img': {
            'attr': ['size','background']
        },
        'a': {
            'attr': ['size','background']
        },
        'p': {
            'attr': ['typography', 'size','background']
        },
        'span': {
            'attr': ['size','background']
        },
        'b': {
            'attr': ['size','background']
        },
        'i': {
            'attr': ['size','background']
        },
        'ol': {
            'attr': ['size','background']
        },
        'ul': {
            'attr': ['size','background']
        },
        'li': {
            'attr': ['size','background']
        },
        'h1': {
            'attr': ['size','background']
        },
        'h2': {
            'attr': ['size','background']
        },
        'h3': {
            'attr': ['size','background']
        },
        'h4': {
            'attr': ['size','background']
        },
        'h5': {
            'attr': ['size','background']
        }
    },

    /**
     * 不可靠的标签名单
     * 包含的标签已确认被过滤,严重造成简介排版
     */
    elementBlackList: {
        'div': {
            'style': ['color'],
        },
        'strong': {
            'tip': '这样的加粗方式已经不适应，会被官方过滤造成简介排版问题',
            'style': [],
        }
    },

    /**
     * 白板配置
     * 工作台大小
     */
    blankSize: [
        {
            name: '无限制',
            company: 'auto',
            width: 0,
            height: 0,
        },
        {
            name: "小",
            company: "px",
            width: 856,
            height: 174,
        },
        {
            name: "中",
            company: "px",
            width: 998,
            height: 174,
        },
        {
            name: "中大",
            company: "px",
            width: 998,
            height: 230,
        },
        {
            name: "大",
            company: "px",
            width: 1140,
            height: 174,
        },

    ]
};