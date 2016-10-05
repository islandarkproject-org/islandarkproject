import ReactDOM from 'react-dom'

const acceptedFileExtensions = /\.(png|jpe?g|gif|bmp|txt|doc|pdf|wav|mp3|mp4|mov|wmv|webm|ogv|mpe?g|ogg|wma|svg|epub|ods|odt|csv|docx?|)/

export const trimFileExtension = filename => filename.replace(acceptedFileExtensions, '')

export const scrollToElement = (elem) => {
  elem = ReactDOM.findDOMNode(elem)
  let offset = elem.getBoundingClientRect().top

  return window.scrollTo(0, offset)
}
