import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import '../Login/login.scss'
import { useNavigate } from 'react-router-dom';

const Login= () => {

  //CADA UNO AQUI COLOCA SU ID GENERADO DE GOOGLE CLOUD DE CREDENCIALES
  /*ID DE CRISTIAN*/'186393898515-e9rob8vfk1ntvqjak9j4i1r38gfcfmqt.apps.googleusercontent.com'
  const CLIENT_ID = "186393898515-e9rob8vfk1ntvqjak9j4i1r38gfcfmqt.apps.googleusercontent.com";
  
  //constante para navegar
  const navigate = useNavigate();

  const loginSuccessResponseHandler = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    // Guardar en localStorage
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('nombre', decoded.name);
    localStorage.setItem('idUser', decoded.aud);
    
    //NAVEGA AL INFO POST
    navigate('/infoPost');
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
