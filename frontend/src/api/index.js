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
    let req = new XMLHttpRequest()
    req.open('POST', './login', true)
    req.send(JSON.stringify(details))

    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })

  return d
}
