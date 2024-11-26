import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Field as CustomField, Label } from '../catalyst/fieldset';
import { Input } from '../catalyst/input';
import { Button } from '../catalyst/button';
import useAuth from '../../hooks/useAuth';
import { loginValidationSchema } from '../../utils/validationSchema';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation(['common']);
    const initialValues = { email: '', password: '' };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await login(values.email, values.password);
                    toast.success('Login successful');
                    navigate('/');
                } catch (error: any) {
                    toast.error(error.message || 'An error occurred during login');
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    <div>
                        <CustomField>
                            <Label htmlFor="email">{t('emailAddress')}</Label>
                            <FormikField as={Input} type="email" name="email" id="email" autoComplete="email" required />
                        </CustomField>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <CustomField>
                            <Label htmlFor="password">{t('password')}</Label>
                            <FormikField as={Input} type="password" name="password" id="password" autoComplete="current-password" required />
                        </CustomField>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                            {t('signIn')}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

