// import { errMsg } from './config'
import { error } from 'UTIL/notification';
const ajaxUrl = (options) => {
  var _options = {
    url: options.url,
    complete: function (jqXHR, textStatus) {
      if (options.complete)
        options.complete(jqXHR, textStatus);
    },
    success: function (data, textStatus, jqXHR) {
      if (options.success) {
        if (data.code == '302') {
          error(data.msg);
          setTimeout(function() {
            sessionStorage.removeItem('XDataUserName');
            sessionStorage.removeItem('userRolePermission');
            window.location.replace('/');
          }, 1000);
        }

        options.success(data, textStatus, jqXHR);
      }
    },
    beforeSend: function (jqXHR, settings) {
      if (options.beforeSend)
        options.beforeSend(jqXHR, settings);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (options.error)
        options.error(jqXHR, textStatus, errorThrown);
    },
    data: JSON.stringify(options.data || {}),
    type: options.type || 'POST',
    dataType: options.dataType || 'json',
    contentType: options.contentType || 'application/json;charset=utf-8',
    cache: false,
    async: options.async || false
  };

  if (options.ajaxConfig) {
    $.extend(_options, options.ajaxConfig);
  }

  $.ajax(_options);
};

/*
 当出现非正常请求时，如404等，进行统一弹出警告信息处理
 */
$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
  // var errorMessage = jqXHR.responseText
  switch (jqXHR.status) {
    case 406:
        // TODO
      break;
    case 400:
        // TODO
      break;
    case 401:
        // TODO
      break;
    case 403:
        // TODO
      break;
    case 404:
        // TODO
      break;
    case 500:
        // TODO
      break;
    default:
        // TODO
      break;
  }
});

$(document).ajaxSuccess(function(event, jqXHR) {
  // var errorMessage = '';
  switch (jqXHR.status) {
    case 206:
      // errorMessage = $.parseJSON(jqXHR.responseText)
      break;
  }
});

export default ajaxUrl;
