import { GraphQLError } from 'graphql';
import { appError, ErrorCode } from '@kry/errors';
import { AppI18nLang } from '@kry/i18n';

export const getErrorMessage = (code: ErrorCode, lang: AppI18nLang = 'en') => {
  try {
    const message = appError(code, lang);

    return new GraphQLError(message, {
      extensions: {
        code,
      },
    });
  } catch (error) {
    const code = 112;
    const message = appError(code);

    return new GraphQLError(message, {
      extensions: {
        code,
      },
    });
  }
};
