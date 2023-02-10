import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { KryLogin } from '@kry/react';
import * as yup from 'yup';
import { ProgressBar } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { themes } from '@kry/themes';
import envs from '@kry/envs';
import { langs } from '@kry/i18n';
import { AppState } from '@/store';
import { withGuard } from '@/components/guards/auth';
import { CreateUserInput } from '@kry/api/src/graphql/schemas/users.schemas';

import { appErrors } from '../../utils/err';
import { signupService } from '../../services/auth.services';
import { setAuthAction, setUserAction } from '../../store/actions/auth.actions';

import background from '../../assets/images/auth_background.png';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(appErrors.messages.required)
    .trim()
    .email(appErrors.messages.email),
  password: yup.string().required(appErrors.messages.required),
  username: yup.string().required(appErrors.messages.required),
});

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang].web;

  const {
    register,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'all',

    resolver: yupResolver(schema),
  });

  const form = watch();

  useEffect(() => {
    const fields = ['email', 'password', 'username'];

    fields.forEach(field => register(field));
  }, [register]);

  const onSignup = async () => {
    if (!isLoading) {
      setLoading(true);
      const { errors, data } = await signupService(form as CreateUserInput);

      if (errors) return setLoading(false);

      if (data) {
        const { token, user } = data.SignUp;

        dispatch(setAuthAction({ token: token, logged: true }));
        dispatch(setUserAction(user));
        localStorage.setItem(envs.localStorageKeys.token, token);
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
      }
    }
  };

  return (
    <KryLogin
      type="signup"
      action={i18n.sidebar.signup.toUpperCase()}
      redirect={i18n.sidebar.login}
      icon="/logo.png"
      background={background.src}
      footer={i18n.auth.alreadyHaveAccount}
      email={form.email}
      password={form.password}
      username={form.username}
      isLoading={isLoading}
      labelEmail={i18n.form.email}
      labelPassword={i18n.form.password}
      labelUsername={i18n.form.username}
      isInvalid={!isValid}
      passwordMessage={appErrors.getMessage('password', errors)}
      usernameMessage={appErrors.getMessage('username', errors)}
      emailMessage={appErrors.getMessage('email', errors)}
      onKryChangeEmail={e => setValue('email', e.detail, { shouldValidate: true })}
      onKryChangePassword={e => setValue('password', e.detail, { shouldValidate: true })}
      onKryChangeUsername={e => setValue('username', e.detail, { shouldValidate: true })}
      onKryAuth={onSignup}
      onKryRedirect={e => router.push(e.detail ?? '/auth/login')}
    >
      <Head>
        <title>Signup | Space Krypton</title>
      </Head>

      <ProgressBar
        height="40px"
        visible={isLoading}
        width="40px"
        barColor={themes.dark.secondaryColorUp}
        borderColor={themes.dark.textColorDown}
      />
    </KryLogin>
  );
};

export default withGuard(Signup);
