import { Heading } from '../components/catalyst/heading';
import { TextLink, Strong, Text } from '../components/catalyst/text';
import SignupForm from '../components/auth/SignupForm';
import todo from "../assets/todo1.png";
import { useTranslation } from 'react-i18next';

const SignupPage: React.FC = () => {
    const { t } = useTranslation(['common','todo', 'signUp']);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 lg:px-8 dark:bg-zinc-900 dark:lg:bg-zinc-950">
            <div className="w-full max-w-sm space-y-2">
                <div>
                    <img
                        className="mx-auto w-auto h-24"
                        src={todo}
                        alt="My Todo List"
                    />
                    <Heading className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        {t('signUp:getStartedDesc')}
                    </Heading>
                </div>
                <SignupForm />
                <Text>
                    {t('signUp:notAMember')}{' '}
                    <TextLink href="/login" className="no-underline">
                        <Strong>{t('common:loginNow')}</Strong>
                    </TextLink>
                </Text>
            </div>
        </div>
    )
}

export default SignupPage
