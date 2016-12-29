import React, { PropTypes } from 'react'
import OverlayIndicator from './OverlayIndicator'

const ImgPreview = ({src, name, height, moreFiles}) => {
  const preview = src ?
    <img
      className='img'
      src={src}
      alt={name} />
      :
    <h4 className='failure'>Something Went Wrong, Please Try Again</h4>

  const moreFilesIndicator = moreFiles > 0 ?
    <OverlayIndicator>{`+ ${moreFiles}`}</OverlayIndicator>
      :
    null

  return (
    <div className='ImgPreview'>
      {moreFilesIndicator}
      {preview}
    </div>
  )
}

ImgPreview.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default ImgPreview
