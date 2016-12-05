import ReactDOM from 'react-dom'

const acceptedFileExtensions = /\.(png|jpe?g|gif|bmp|txt|doc|pdf|wav|mp3|mp4|mov|wmv|webm|ogv|mpe?g|ogg|wma|svg|epub|ods|odt|csv|docx?|)/

export const trimFileExtension = filename => filename.replace(acceptedFileExtensions, '')

export const scrollToElement = (elem) => {
  elem = ReactDOM.findDOMNode(elem)
  let offset = elem.getBoundingClientRect().top

  return window.scrollTo(0, offset)
}

export const getUserLocation = (successCallback, failureCallback) => {
  if ('geolocation' in navigator) {
    return navigator.geolocation.getCurrentPosition(
      (position) => successCallback({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (error) => failureCallback(error)
    )
  } else {
    return failureCallback('Geolocation API not found')
  }
}

export const validator = (value, type) => {
  // TODO: This is an awful way of handling input errors, do this properly in hindsight
  switch(type) {
    case 'password':
      if (value.length > 8) {
        return true
      } else {
        throw new Error('password')
      }
    case 'username':
      // Accept all usernames for now - something worth thinking about though
      return true
    default:
      throw new Error('What is being validated against? No matches found')
  }
}
