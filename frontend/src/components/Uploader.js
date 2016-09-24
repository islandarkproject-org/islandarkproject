import React from 'react'
import Dropzone from 'react-dropzone'
import TitleText from './TitleText'
import BodyText from './BodyText'
import Button from './Button'

class Uploader extends React.Component {
  constructor () {
    super()
    this.uploadMedia = this.uploadMedia.bind(this)
  }

  uploadMedia (media) {
    return this.props.uploadMedia(media)
  }

  render () {
    let resetStyle = {}
    let uploadForms = this.props.uploadedMedia.map((medium) => 
      medium.media.map((file) =>
        <form>
          <input type='text' value={file.name} onChange={(e) => e} />
        </form>
      )
    )
    return (
      <section className='Uploader'>
        <TitleText>Upload Media</TitleText>
        <BodyText>
          Upload files and media, photos, documents, videos, anything.
        </BodyText>
        <div className='upload-area'>
          <Dropzone onDrop={this.uploadMedia} style={resetStyle} className='Dropzone'>
            <p>Drag and Drop</p>
            <p>or:</p>
            <Button className='upload-button'>Start Upload</Button>
          </Dropzone>
          {uploadForms}
        </div>
      </section>
    )
  }
}

export default Uploader
