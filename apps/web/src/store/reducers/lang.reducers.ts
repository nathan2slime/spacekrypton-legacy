import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { setLocalStorageItem } from '@/utils/funcs';
import { setLangAction } from '@/store/actions/lang.actions';
import { AppI18nLang } from '@kry/i18n';
import envs from '@kry/envs';

const INITIAL: AppI18nLang = 'en';

export default createReducer<AppI18nLang>(INITIAL, builder => {
  builder.addCase<string, AnyAction>(setLangAction.type, (__, action) => {
    const lang = action.payload;

    setLocalStorageItem(envs.localStorageKeys.lang, lang);

    return lang;
  });
});
