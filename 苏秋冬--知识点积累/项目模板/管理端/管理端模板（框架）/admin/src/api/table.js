import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/v1/admin/content/contents/',
        method: 'get',
        params
    })
}