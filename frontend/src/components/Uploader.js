import React from 'react'
import Dropzone from 'react-dropzone'
import TitleText from './TitleText'
import BodyText from './BodyText'
import Button from './Button'
import UploadForm from './UploadForm'
import { scrollToElement } from '../helpers'

class Uploader extends React.Component {
  constructor () {
    super()
    this.uploadMedia = this.uploadMedia.bind(this)
  }

  componentDidUpdate (prevProps) {
    // Move view to upload form if file was just uploaded
    if (!prevProps.uploadedMedia.info && !!this.props.uploadedMedia.info) {
      scrollToElement(this._uploadForm)
    }
  }

  uploadMedia (media) {
    return this.props.uploadMedia(media)
  }

  render () {
    let resetStyle = {}
    let info = this.props.uploadedMedia.info

    // Once the file(s) have been uploaded, display a form to edit the info for submission
    let uploadForm = info ? <UploadForm
                              ref={(c) => this._uploadForm = c}
                              updateUploadInfo={this.props.updateUploadInfo}
                              name={info.name}
                              description={info.description}
                              tags={info.tags}
                              isPrivate={info.isPrivate}
                              location={info.location}
                            /> : null

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
            <Button className='upload-button'>Browse Files</Button>
          </Dropzone>
          {uploadForm}
        </div>
      </section>
    )
  }
}

export default Uploader
