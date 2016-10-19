import React, { PropTypes } from 'react'

class IAPDateInput extends React.Component {
	render () {
		return (
			<input
				className='IAPDateInput'
				type='date'
				defaultValue={this.props.value}
				onChange={this.props.onChange}
				onFocus={this.props.onFocus}
			/>
		)
	}
}

IAPDateInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func
}

export default IAPDateInput
