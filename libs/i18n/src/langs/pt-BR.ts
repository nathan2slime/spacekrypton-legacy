import { AppI18n } from '../types';

export const ptBR: AppI18n = {
  err: {
    userNotFound: 'Usuário não encontrado',
    emailAlredyExists: 'Email já existe',
    isNotAuthenticated: 'Não autenticado',
    invalidCredentials: 'Credenciais invalidas',
    unableGetAltitude: 'Não foi possivel obter altitude',
    errorUnknow: 'Erro desconhecido',
    languageNotAvailable: 'Idioma não disponível',
    noSatellitesFound: 'Nenhum satélite encontrado',
    timeoutError: 'Tempo excedido, tente novamente',
    unableSearchSatellites: 'Não foi possivel pesquisar satélites',
    unableTrackSatellite: 'Não foi possível rastrear este satélite',
    notAuthorized: 'Não autorizado',
  },
  web: {
    form: {
      email: 'Email',
      password: 'Senha',
      search: 'Pesquisar',
      username: 'Nome de usuário',
    },
    yes: 'Sim',
    no: 'Não',
    satellites: {
      altitude: 'Altitude',
      azimuth: 'Azimute',
      latitude: 'Latitude',
      eclipsed: 'Eclipsado',
      inclination: 'Inclinação',
      longitude: 'Longitude',
      loading3d: 'Carregando experiência 3D',
      tracking: 'Rastreando satélites',
      searching: 'Buscando satétlites',
      getAltitude: 'Obtendo sua localização',
      offline: 'Sem conexão',
      name: 'Nome',
      you: 'Você',
      declination: 'Declinação',
      elevation: 'Elevação',
      rightAscension: 'Ascenção alta',
      timestamp: 'Marca temporal',
      toggleView: 'Escolha um modo de interação',
      period: 'Período',
      title: 'Satélites',
      track: 'Rastrear',
      results: ' satélites rastreados',
      eccentricity: 'Excentricidade',
    },
    sidebar: {
      logout: 'Sair',
      news: 'Notícias',
      profile: 'Perfil',
      signup: 'Cadastro',
      login: 'Entrar',
      satellites: 'Satélites',
    },
    auth: {
      alreadyHaveAccount: 'Já tem uma conta?',
      noHaveAccount: 'Ainda não tem uma conta?',
    },
  },
};