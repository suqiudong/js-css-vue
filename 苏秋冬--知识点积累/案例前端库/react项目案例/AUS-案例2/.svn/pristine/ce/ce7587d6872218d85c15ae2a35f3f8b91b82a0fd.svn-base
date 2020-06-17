/**
 * qtip构造类
 * User: gaogy
 * Date: 2017/1/16
 * Time: 19:12
 */
function createTip(options) {
    let tip = $(options.parent).qtip({
        content: options.content || '',
        position: {
            my: 'left center',
            at: 'bottom right',
            target: $(options.parent)
        },
        style: {
            classes: 'qtip-blue qtip-shadow'
        },
        show: {
            event: options.event || 'mouseenter'
        }
    });

    return tip;
}

export default createTip;
