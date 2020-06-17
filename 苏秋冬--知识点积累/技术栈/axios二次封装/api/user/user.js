import { post, fetch, patch, put } from '../index'
const user = {
    login: function(paramObj) {
        return fetch('/mock/34/v1/api/supervision/open/admin/document/catalogs/', paramObj);
    }
}
export default user