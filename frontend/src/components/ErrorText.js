import React, { PropTypes } from 'react'

class ErrorText extends React.Component {
	render () {
		return (
			<p className='ErrorText'>{this.props.children}</p>
		)
	}
}

ErrorText.propTypes = {

}

export default ErrorText
