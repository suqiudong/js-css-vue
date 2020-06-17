/**
 * 通用工具类
 * User: gaogy
 * Date: 2016/12/26
 * Time: 20:26
 */


/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
function arrayUnique(array) {
    var res = [];
    var json = {};
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
}

/**
 * 单位转换
 * @param size
 * @returns {*}
 */
function unitTransform (size) {
    if (!isNaN(Number(size)) && Number(size) && Number(size) >= 0) {
        var i = 0;
        var units = ['B', 'KB', 'M', 'G', 'T'];
        while (Math.abs(size) >= 1024)
        {
            size = size / 1024 ;
            i++;
            if (i === 4) {
                break;
            }
        }
        var newSize = ((Number)(size)).toFixed(2);
        return (newSize + ' ' + units[i]);
    } else {
        return '0B';
    }

    if (typeof size === 'number') {

    } else if (typeof size === 'string') {
        if (isNaN(Number(size))) {
            return '0B'
        } else {

        }
    } else {
        return '0B'
    }
}

/**
 * 字符串截取
 * @param str
 * @param len
 * @returns {*}
 */
function cutStr (str, len) {

    if (!str) {
        return '-';
    }

    let strLength = 0;
    let strLen = 0;
    let strCut = '';
    strLen = str.length;
    for (let i = 0; i < strLen; i++) {
        let a = str.charAt(i);
        strLength++;
        if (escape(a).length > 4) {
            // 中文字符的长度经编码之后大于4
            strLength++;
        }
        strCut = strCut.concat(a);
        if (strLength >= len) {
            strCut = strCut.concat('...');
            return strCut;
        }
    }
    // 如果给定字符串小于指定长度，则返回源字符串；
    if (strLength < len) {
        return str;
    }
}

/**
 * 日期字符串格式化
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param date
 * @param fmt
 * @returns {*}
 */
function dateFormat (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,                 // 月份
        'd+': date.getDate(),                    // 日
        'h+': date.getHours(),                   // 小时
        'm+': date.getMinutes(),                 // 分
        's+': date.getSeconds(),                 // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}

export { arrayUnique, unitTransform, cutStr, dateFormat }
