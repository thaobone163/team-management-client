import { data } from "autoprefixer";
import axios from "axios"
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

// Api-base
async function getConfig() {
    const token = Cookies.get('token')
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const api = axios.create({
    baseURL: 'https://api.projectmana.online'
})

// login with email and password
export async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password })
        .then(response => {
            Cookies.set('token', response.data.accessToken)
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// login with google account
export async function loginGoogle() {
    const res = await api.get('api/google/token')
        .then(response => {
            Cookies.set('token', response.data.accessToken)
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// register
export async function register(full_name, email, password) {
    const res = await api.post('/api/auth/register', { full_name, email, password })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// verify email
export async function verify(email) {
    const res = await api.post('/api/email/send', { email })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// forgot pass
export async function forgot(email) {
    const res = await api.post('/api/email/reset_password', { email })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// get user info
export async function getUser() {
    const res = await api.get('api/user', await getConfig())
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// change password
export async function changePassword(password, new_password) {
    const res = await api.post('/api/user/change_password', { password, new_password }, await getConfig())
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
    return res
}

// update profile
export async function updateProfile(full_name, email, dob, phone_number, gender) {
    const res = await api.put('/api/user', { full_name, email, dob, phone_number, gender }, await getConfig())
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
        console.log(res);
    return res
}

// create project
export async function createProject(name, description, listUserInvite) {
    const res = await api.post('/api/project/create', { name, description, listUserInvite }, await getConfig())
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
        console.log(res);
    return res
}

// get project by id
export async function getProjectId(id) {
    const res = await api.get(`/api/project/${id}`, await getConfig())
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
        console.log(res);
    return res
}