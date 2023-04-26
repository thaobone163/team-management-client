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
  return res
}

// get user by email
export async function getUserByEmail(email) {
  const res = await api.get(`/api/user/${email}`, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// update project by id
export async function updateProjectId(id, name, description, status, user, teammate) {
  const res = await api.put(`/api/project/edit/${id}`, { name, description, status, user, teammate }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// get project overview
export async function getProjectOverview() {
  const res = await api.get(`/api/user/projects/count`, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response
    })
  return res
}

// get project list
export async function getProjectList(name, role, status) {
  const res = await api.post(`/api/project/list`, { name, role, status }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// create plan
export async function createPlan(id, topic, target, stage, note, deadline) {
  const res = await api.post(`/api/planning/create/${id}`, { topic, target, stage, note, deadline }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// get plan
export async function getPlanProject(id) {
  const res = await api.get(`/api/planning/read/${id}`, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// update plan
export async function updatePlanProject(id, topic, target, oldStage, newStage, note, deadline) {
  const res = await api.put(`/api/planning/update/${id}`, { topic, target, oldStage, newStage, note, deadline }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// delete timeline stage
export async function deleteStage(id, stage) {
  const token = Cookies.get('token')

  const res = await api.delete(`/api/planning/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data:
    {
      stage: stage
    }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })

  console.log(res);
  return res
}

// get invitation list
export async function invitationList(project_name, role) {
  const res = await api.post(`/api/user/invitations/list`, { project_name, role }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// accept invitation
export async function acceptInvitation(id, accept) {
  const res = await api.put(`/api/user/${id}/invite/respond`, { accept }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// deny invitation
export async function denyInvitation(id) {
  const res = await api.put(`/api/user/outproject/${id}`, {}, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}

// create task
export async function createTask(stage, title, project, description, assign, duedate, estimate, tags) {
  const res = await api.post(`/api/task/create`, { stage, title, project, description, assign, duedate, estimate, tags }, await getConfig())
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
}
