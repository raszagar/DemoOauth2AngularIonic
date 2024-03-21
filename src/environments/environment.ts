
export const environment = {
  production: false,

  //Auth config
  authClientID: '********-16ec-45b6-851f-b2042ee928be',
  authTenantID: 'https://login.microsoftonline.com/********-3bb7-4f38-b6c4-0813abdc2139',
  authRedirectUri: 'http://localhost:8100',
  //authRedirectUri: 'capacitor://localhost/home',
  
  //Auth scopes
  TOKEN_SCOPE_GRAPH: "https://graph.microsoft.com/.default",
  TOKEN_SCOPE_API: "api://********-16ec-45b6-851f-b2042ee928be/ApiPrueba",

  //Api Graph
  baseUrlGraph: 'https://graph.microsoft.com/v1.0/',
  apiGraphMe: 'me',

  //Api Saludo
  baseUrlSaludo: 'http://10.22.179.107:8080/demo-oauth2/',
  apiSaludoTest: 'ws/test',
  apiSaludoSaludar: 'ws/saludo'

};
