import React, { PropTypes } from 'react'
import IAPTextInput from './IAPTextInput'
import IAPCheckBox from './IAPCheckBox'

class UploadForm extends React.Component {
  render () {
    return (
      <form className='UploadForm'>
        <label>
          <h4>Name Your Upload</h4>
          <IAPTextInput placeholder='Enter a name' value={this.props.name} />
        </label>
        <label>
          <h4>Describe Your Upload</h4>
          <textarea placeholder='Describe this upload'>{this.props.description}</textarea>
        </label>
        <label>
          <h4>Tag Your Upload</h4>
          <IAPTextInput placeholder='Celebration, language, etc.' value={this.props.tags.join(', ')} />
        </label>
        <label>
          <h4>Make this public? Remove the check to make it private.</h4>
          <IAPCheckBox checked={!this.props.isPrivate} />
        </label>
        <label>
          <h4>Location of the Upload</h4>
          <IAPTextInput placeholder='Enter the location' value={this.props.location} />
        </label>
      </form>
    )
  }
}

UploadForm.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isPrivate: PropTypes.bool.isRequired,
  location: PropTypes.string
}

export default UploadForm
