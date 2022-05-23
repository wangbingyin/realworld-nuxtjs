import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login', 
        data
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users', 
        data
    })
}

// Get current user
export const getUser = params => {
    return request({
        method: 'GET',
        url: '/api/user', 
        params 
    })
}

// Update current user
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/api/user', 
        data 
    })
}
