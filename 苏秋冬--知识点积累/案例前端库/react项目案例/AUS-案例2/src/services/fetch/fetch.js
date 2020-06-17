import { error } from 'UTIL/notification';
import fetch from 'isomorphic-fetch';
const fetchUrl = (options) => {
    var _options = {
        url: options.url,
        base: {
            method: options.type || 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': options.contentType || 'application/json;charset=utf-8'
            }
        },
        success: function (data) {
            if (options.success) {
                if (data.code == '302') {
                    error(data.msg);
                    setTimeout(function() {
                        sessionStorage.removeItem('XDataUserName');
                        sessionStorage.removeItem('userRolePermission');
                        window.location.replace('/');
                    }, 1000);
                }
                return options.success(data);
            }
        },
        error: function (e) {
            if (options.error) {
                options.error(e);
            } else {
                error(e);
            }
        }
    };
    if (options.type == undefined || options.type === 'POST' || options.type === 'post') {
        _options.base.body = JSON.stringify(options.data || {})
    }

    let fetchPost = async function (_options) {
        return await fetch(_options.url, _options.base).then(response =>
            response.json()
        ).then((data)=>{
            return _options.success(data);
        }).catch(e => {
            _options.error(e);
        })
    };

    return fetchPost(_options)

};

export default fetchUrl;
