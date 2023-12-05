import React, { useState } from 'react';
import { uploadPost } from '../../service/Services';
import './form.scss';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Navigation from '../Navigator/navigator';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reactions, setReactions] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('idUser');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();


  // Obtener el valor del localStorage con la clave "miArray"
  //const arrayGuardado = localStorage.getItem("miArrayGuardado");

  // Convertir la cadena a un array utilizando JSON.parse
  //const arrayRecuperado = JSON.parse(arrayGuardado);



  const handleGuardarPost = async (e) => {
    e.preventDefault();

    if (!title || !body || !reactions || !tags) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (isNaN(parseFloat(reactions))) {
      setError('El precio debe ser un número');
      return;
    }

    try {
      const newPost = {
        title,
        body,
        reactions,
        tags,
        userId
      };

      // Lógica de subida de datos a través del servicio uploadUserData
      await uploadPost(newPost);
      console.log('Post se agregó correctamente!');
      setError('');

      // Limpiar los campos después de guardar la casa
      setTitle('');
      setBody('');
      setReactions('');
      setTags('');

      // Mostrar mensaje de éxito temporalmente
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Mensaje visible durante 3 segundos (3000 milisegundos)


    } catch (error) {
      console.log(error.message);
    }
  };
  const Exit = () => {
    navigate('/home');
  };

  return (
    <div>
      <Navigation />
      <form onSubmit={handleGuardarPost} className="formContainer">
        <div className="formField">
          <h1 className="formFieldTitulo">Formulario en React</h1 >
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="inputField" />
        </div>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} className="inputField" />
        <br />
        <label>Reactions:</label>
        <input type="number" value={reactions} onChange={(e) => setReactions(e.target.value)} className="inputField" />
        <br />
        <label>Tags:</label>
        <textarea value={Array.isArray(tags) ? tags.join(',') : ''} onChange={(e) => setTags(e.target.value.split(','))} className="inputField" />
        <br />
        <br>
        </br>
        <div class="buttonContainer">
          <button type="submit" className="submitButton">Save</button>
          <button onClick={Exit} className="submitButtonSalir">Exit</button>
        </div>
        {showSuccessMessage && <p style={{ color: 'green' }}>¡Datos guardados!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;
