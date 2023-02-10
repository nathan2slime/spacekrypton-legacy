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
import { withGuard } from '@/components/guards/auth';
import { LoginInput } from '@kry/api/src/graphql/schemas/users.schemas';
import { AppState } from '@/store';
import { langs } from '@kry/i18n';
import envs from '@kry/envs';

import { appErrors } from '../../utils/err';
import { loginService } from '../../services/auth.services';
import { setAuthAction, setUserAction } from '../../store/actions/auth.actions';

import background from '../../assets/images/auth_background.png';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(appErrors.messages.required)
    .trim()
    .email(appErrors.messages.email),
  password: yup.string().required(appErrors.messages.required),
});

const Login: NextPage = () => {
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
    const fields = ['email', 'password'];

    fields.forEach(field => register(field));
  }, [register]);

  const onLogin = async () => {
    if (!isLoading) {
      setLoading(true);
      const { errors, data } = await loginService(form as LoginInput);

      if (errors) return setLoading(false);

      if (data) {
        const { token, user } = data.Login;

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
      type="login"
      action={i18n.sidebar.login.toUpperCase()}
      redirect={i18n.sidebar.signup}
      icon="/logo.png"
      background={background.src}
      footer={i18n.auth.noHaveAccount}
      email={form.email}
      password={form.password}
      isInvalid={!isValid}
      isLoading={isLoading}
      labelEmail={i18n.form.email}
      labelPassword={i18n.form.password}
      passwordMessage={appErrors.getMessage('password', errors)}
      emailMessage={appErrors.getMessage('email', errors)}
      onKryChangeEmail={e => setValue('email', e.detail, { shouldValidate: true })}
      onKryChangePassword={e => setValue('password', e.detail, { shouldValidate: true })}
      onKryAuth={onLogin}
      onKryRedirect={e => router.push(e.detail ?? '/auth/signup')}
    >
      <Head>
        <title>Login | Space Krypton</title>
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

export default withGuard(Login);
