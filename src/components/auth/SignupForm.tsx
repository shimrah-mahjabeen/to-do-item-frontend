import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { Field as CustomField, Label } from '../catalyst/fieldset'
import { Input } from '../catalyst/input'
import { Button } from '../catalyst/button'
import { signupValidationSchema } from '../../utils/validationSchema'
import useAuth from '../../hooks/useAuth'
import { useTranslation } from 'react-i18next';

function SignupForm() {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const { t } = useTranslation(['common', 'signUp']);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={signupValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { name, email, password, passwordConfirmation } = values;
                        if(password !== passwordConfirmation) { toast.error("Passwords don't match"); return }
                        setSubmitting(true)
                        await signup(name, email, password, passwordConfirmation)
                        toast.success('Signup successful')
                        navigate('/login')
                    } catch (error: any) {
                        toast.error(error.message)
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">

                        <div>
                            <CustomField>
                                <Label>{t('userName')}</Label>
                                <FormikField as={Input} type="name" name="name" id="name" required />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <CustomField>
                                <Label>{t('emailAddress')}</Label>
                                <FormikField as={Input} type="email" name="email" id="email" autoComplete="email" required />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <CustomField>
                                <Label>{t('password')}</Label>
                                <FormikField as={Input} type="password" name="password" id="password" autoComplete="password" required />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <CustomField>
                                <Label>{t('confirmPassword')}</Label>
                                <FormikField as={Input} type="password" name="passwordConfirmation" id="passwordConfirmation" autoComplete="password" required />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                {t('signUp:getStarted')}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignupForm
