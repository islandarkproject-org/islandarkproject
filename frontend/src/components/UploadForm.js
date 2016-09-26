import React from 'react'
import IAPTextInput from './IAPTextInput'

class UploadForm extends React.Component {
  render () {
    return (
      <form className='UploadForm'>
        <IAPTextInput type='text' placeholder='Enter a name' value={this.props.name} />
        <textarea placeholder='Describe this upload'>{this.props.description}</textarea>
        <IAPTextInput type='text' placeholder='Celebration, language, etc.' value={this.props.tags.join(', ')} />
        <input type='checkbox' checked={this.props.isPrivate} />
        <IAPTextInput type='text' placeholder='Enter the location' value={this.props.location} />
      </form>
    )
  }
}

export default UploadForm
