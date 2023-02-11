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

import { signupService } from '@/services/auth.services';
import { setAuthAction, setUserAction } from '@/store/actions/auth.actions';
import { getFieldMessage } from '@/utils/funcs';

import background from '@/assets/images/auth_background.png';

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang].web;

  const schema = yup.object().shape({
    email: yup.string().required(i18n.form.required).trim().email(i18n.form.invalidEmail),
    password: yup.string().required(i18n.form.required),
    username: yup.string().required(i18n.form.required).length(15, i18n.form.limit(15)),
  });

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
      passwordMessage={getFieldMessage('password', errors)}
      usernameMessage={getFieldMessage('username', errors)}
      emailMessage={getFieldMessage('email', errors)}
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
