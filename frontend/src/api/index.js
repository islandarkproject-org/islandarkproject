import { hashHistory } from 'react-router'
import request from 'superagent'

export function getJSON (url) {
  let d = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open('GET', url)
    req.send()

    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })
  .then((responseData) => JSON.parse(responseData))
  .catch((error) => console.log(error))

  return d
}

export function fetchTeamData () {
  return getJSON('./frontend/src/team.json')
}

export function logIn (details) {
  let d = new Promise((resolve, reject) => {
    // Convert details to appropriate format for API
    details = JSON.stringify(details)
    
    let req = new XMLHttpRequest()
    req.open('POST', './login', true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(details)

    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })

  // Re-route to home page on success
  d.then(() => hashHistory.push('')).catch(() => 1)

  return d
}

export function logOut () {
  let d = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open('POST', './logout', true)
    req.send()

    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })

  // Re-route to upload page on success
  d.then(() => hashHistory.push('upload')).catch(() => 1)

  return d
}

export function register (details) {
  let d = new Promise((resolve, reject) => {
    // Convert details to appropriate format for API
    details = JSON.stringify(details)
    
    let req = new XMLHttpRequest()
    req.open('POST', './register', true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(details)

    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })

  // Re-route to home page on success
  d.then(() => hashHistory.push('')).catch(() => 1)

  return d
}

export function upload (media) {
  // Send the file first, then the info separately
  return request
    .post('/uploadFile')
    .type('multipart/form-data')
    .send(media.files)
}

export function fetchFiles () {
  return request
    .get('/getData')
    .type('application/json')
    .send()
    .end((error, response) => console.log(response))
}
