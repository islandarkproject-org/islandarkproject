import React from 'react'
import Dropzone from 'react-dropzone'
import TitleText from './TitleText'
import BodyText from './BodyText'
import Button from './Button'
import UploadForm from './UploadForm'

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
    let info = this.props.uploadedMedia.info

    // Once the file(s) have been uploaded, display a form to edit the info for submission
    let uploadForm = info ? <UploadForm
                        name={info.name}
                        description={info.description}
                        tags={info.tags}
                        isPrivate={info.isPrivate}
                        location={info.location} /> : null

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
          {uploadForm}
        </div>
      </section>
    )
  }
}

export default Uploader
