const fields = {
	login: ['username', 'password'],
	register: ['username', 'password', 'confirmPassword', 'email', 'fName']
}

const validators = {
	username: /^[a-z0-9]+$/i,
	password: /\.{8+}/,
	confirmPassword: (password) => password === this.password,
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	fName: /\w+/
}

const errors = {
	username: 'Please enter a username of letters and numbers only',
	password: 'Please enter a password of at least 8 characters',
	confirmPassword: 'Passwords do not match',
	email: 'Please enter a valid email address',
	fName: 'Please enter a name consisting only of letters'
}

const validate = (formType, values) => {
	const formFields = fields[formType]
	formFields.map((field) => {
		const pattern = validators[field]
		if (pattern instanceof RegExp) {
			return pattern.test(values[field])
		} else {
			return pattern.call(this, values[field])
		}
	}).map((isValid, index) => {
		return isValid ? isValid : errors[formFields[index]]
	})
}