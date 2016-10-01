import React, { PropTypes } from 'react'
import OverlayIndicator from './OverlayIndicator'

class ImgPreview extends React.Component {
  render () {
    let preview = this.props.src ?
          <img className='img' src={this.props.src} alt={this.props.name} height={this.props.height} />
            :
          <h4 className='failure'>Something Went Wrong, Please Try Again</h4>
    
    let moreFilesIndicator = this.props.moreFiles > 0 ?
          <OverlayIndicator>{`+ ${this.props.moreFiles}`}</OverlayIndicator>
            :
          null

    return (
      <div className='ImgPreview'>
        {moreFilesIndicator}
        {preview}
      </div>
    )
  }
}

ImgPreview.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default ImgPreview
