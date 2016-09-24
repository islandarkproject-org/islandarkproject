import React from 'react'

class UploadForm extends React.Component {
  render () {
    return (
      <form className='UploadForm'>
        <input type='text' placeholder='Enter a name' value={this.props.name} />
        <textarea placeholder='Describe this upload'>{this.props.description}</textarea>
        <input type='text' placeholder='Celebration, language, etc.' value={this.props.tags.join(', ')} />
        <input type='check' checked={this.props.isPrivate} />
        <input type='text' placeholder='Enter the location' value={this.props.location} />
      </form>
    )
  }
}

export default UploadForm
