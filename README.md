https://medium.com/@abhishekgarg.dev/google-sign-in-react-native-0fa5bc00ced9

Para o login usando a conta Google é necessário gerar o keystore na pasta android/app  
`keytool -genkeypair -v -storetype PKCS12 -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000`

Gerar o SHA1 com a ferramenta keytool e aplicar no Firebase Console  
`keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android`

E após isso baixar o google-services.json e copiá-lo na pasta android/app

Entrar em Authentication e habilitar o Google Login

