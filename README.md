# Proyecto Ionic Oauth2

Este proyecto de IONIC es un ejemplo de usar la libreria MSAL de Microsoft para autenticar en Azure AD.

Más información:  
<https://learn.microsoft.com/es-es/entra/identity-platform/tutorial-v2-angular-auth-code>

Notas:
-Tiene que ser Angular 16, cambiar el package.json y el angular.json fijándose en:  
<https://github.com/ionic-team/starters/tree/895e17bde4b6e22948874cace9d122c2b99bd6c0>
Luego borrar node_modules (borrar package-lock.json si da error) y ejecutar:
<code>npm install</code>

**** No funciona el login en Android ****

## Generar build android:
La primera vez:  
~~~
ionic build
ionic cap add android
ionic cap open android
~~~

Las siguientes veces:  
~~~
ionic cap sync
~~~


