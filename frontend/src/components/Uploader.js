import React from 'react'
import Dropzone from 'react-dropzone'

class Uploader extends React.Component {
  uploadMedia (media) {
    
  }

  render () {
    return (
      <section className='Uploader'>
        <Dropzone onDrop={this.uploadMedia}>
          <p>Drag and Drop</p>
        </Dropzone>
      </section>
    )
  }
}

export default Uploader
