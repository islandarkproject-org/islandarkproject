import React, { PropTypes } from 'react'
import BodyText from './BodyText'
import HelperText from './HelperText'
import IAPTextInput from './IAPTextInput'
import IAPTextArea from './IAPTextArea'
import IAPCheckBox from './IAPCheckBox'
import LocationEnterContainer from '../containers/LocationEnterContainer'


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
          <BodyText>Name Your Upload</BodyText>
          <IAPTextInput placeholder='Enter a name' value={this.props.name} onChange={(e) => this.handleOnChange(e, 'name')} />
        </label>
        <label>
          <BodyText>Describe Your Upload</BodyText>
          <IAPTextArea placeholder='e.g. Photo showing how birthdays are celebrated in Palau' value={this.props.description} onChange={(e) => this.handleOnChange(e, 'description')} />
        </label>
        <label>
          <BodyText>Tag Your Upload</BodyText>
          <HelperText>(separate tags with commas)</HelperText>
          <IAPTextInput placeholder='Celebration, language, etc.' value={this.props.tags.join(', ')} onChange={(e) => this.handleOnChange(e, 'tags')} />
        </label>
        <label>
          <BodyText>Make this private?</BodyText>
          <HelperText>Check the box to make it private.</HelperText>
          <IAPCheckBox checked={this.props.isPrivate} onClick={(e) => this.handleOnChange(e, 'isPrivate')} />
        </label>
        <label>
          <BodyText>Choose a Location for the Upload</BodyText>
          <HelperText>(e.g. the location where a photo was taken)</HelperText>
          <LocationEnterContainer />
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
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, undefined]),
      lng: PropTypes.oneOfType([PropTypes.number, undefined])
    })
  ]).isRequired
}

export default UploadForm
