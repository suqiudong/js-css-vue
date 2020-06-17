import axios from 'axios';
const network = axios.create({
    baseURL: 'https://rddp.zjchilink.com',
    // headers: {
    //     'Authorization': ''
    // },
    headers: {
        'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6Im9yRTVoMWtqUjFKZ0lVaDFkTko0ZGMzaFJrZWMiLCJleHAiOjE1Mzg2MTkxMTksImVtYWlsIjoiIn0.i4jbYyzrGLvjxhFYqXF4YGctczInLpu50yzRP6KHzFc'
    }
})

export default network;