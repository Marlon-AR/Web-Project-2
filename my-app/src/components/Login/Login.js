import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import '../Login/login.scss'
import { useNavigate } from 'react-router-dom';
import { uploadUserData } from '../../service/Services'

const Login= () => {

  //CADA UNO AQUI COLOCA SU ID GENERADO DE GOOGLE CLOUD DE CREDENCIALES
  /*ID DE Marlon*/'924919494082-eqbiegmiagtg2cg2krsh0amkbr3j7svc.apps.googleusercontent.com'
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

    //NAVEGA AL HOME
    navigate('/infoPost');

    //VALIDA SI EL USUARIO EXISTE EN LA BD Y SI NO EXISTE LO GUARDA 
    uploadUserData(decoded.aud,decoded) 
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
