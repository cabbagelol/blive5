/**
 * 全局属性配置表
 */

export default {
    url: '',

    /**
     * 程序版本
     */
    appVersion: '5.0.0 beta',

    /**
     * 可用的标签名单
     * 包含的标签稳定可靠，不会被过滤
     * 如果不存在于白名单和黑名单的标签未未知标签,工具会通过选择器提示用户
     */
    elementWhiteList: {
        'div': {
            'tip': ''
        },
        'img': {
            'tip': ''
        }
    },

    /**
     * 不可靠的标签名单
     * 包含的标签已确认被过滤,严重造成简介排版
     */
    elementBlackList: {},

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