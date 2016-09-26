import React, { PropTypes } from 'react'
import IAPTextInput from './IAPTextInput'
import IAPTextArea from './IAPTextArea'
import IAPCheckBox from './IAPCheckBox'

class UploadForm extends React.Component {
  constructor () {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e, field) {
    let value = e.target.value

    if (field === 'tags') {
      value = value.split(/,\s*/)
    } else if (field === 'isPrivate') {
      value = e.target.checked
    }

    return this.props.updateUploadInfo(field, value)
  }

  render () {
    return (
      <form className='UploadForm'>
        <label>
          <h4>Name Your Upload</h4>
          <IAPTextInput placeholder='Enter a name' value={this.props.name} onChange={(e) => this.handleOnChange(e, 'name')} />
        </label>
        <label>
          <h4>Describe Your Upload</h4>
          <IAPTextArea placeholder='e.g. Photo showing how birthdays are celebrated in Palau' value={this.props.description} onChange={(e) => this.handleOnChange(e, 'description')} />
        </label>
        <label>
          <h4>Tag Your Upload (separate tags with commas)</h4>
          <IAPTextInput placeholder='Celebration, language, etc.' value={this.props.tags.join(', ')} onChange={(e) => this.handleOnChange(e, 'tags')} />
        </label>
        <label>
          <h4>Make this private? Check the box to make it private.</h4>
          <IAPCheckBox checked={this.props.isPrivate} onClick={(e) => this.handleOnChange(e, 'isPrivate')} />
        </label>
        <label>
          <h4>Location of the Upload</h4>
          <IAPTextInput placeholder='Enter the location' value={this.props.location} onChange={(e) => this.handleOnChange(e, 'location')} />
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
