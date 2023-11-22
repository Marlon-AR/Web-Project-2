import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import '../Login/login.scss'

const Login= () => {

  //CADA UNO AQUI PONE SU ID GENERADO DE GOOGLE CLOUD
/*API DE CRISTIAN*/'186393898515-e9rob8vfk1ntvqjak9j4i1r38gfcfmqt.apps.googleusercontent.com'

  const CLIENT_ID = "186393898515-e9rob8vfk1ntvqjak9j4i1r38gfcfmqt.apps.googleusercontent.com";
  
  const loginSuccessResponseHandler = (credentialResponse) => {
    //console.log(credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    console.log(decoded.name);
    console.log(decoded.email);
    // redirect a home, props = decoded
  }


  const loginErrorResponseHandler = () => {
    console.log('Login Failed');
    console.log('hola')
  }
  
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="login-container">
        <h3 className="title">Inicia sección con google</h3>
        <div className="google-login">
        <GoogleLogin
          onSuccess={loginSuccessResponseHandler}
          onError={loginErrorResponseHandler}/>  
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
