import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
})

export const signupValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    // passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), ""], 'Passwords must match').required('Password confirmation is required'),
    name: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters'),
})
