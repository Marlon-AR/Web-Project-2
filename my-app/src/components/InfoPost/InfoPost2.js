import React, { useEffect, useState } from 'react';
import {
  getUserDataById,
  getUserDataPostById,
  uploadComments,
  updatePostById,
  getCommentsByPostId,
}
  from '../../service/Services';
import '../InfoPost/infoPost.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Navigation from '../Navigator/navigator';

const VerPost = () => {
  const [postData, setpostData] = useState([]);
  const [userData, setuserData] = useState([]);

  //PARA GUARDAR LAS VARIABLES DE COMENTARIOS
  const [comment, setComment] = useState('');
  const [postId, setpostId] = useState('');

  //COMENTARIOS
  const [commentsData, setCommentsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadData, setReloadData] = useState(false); // NUEVO ESTADO PARA FORZAR CARGA DE DATOS DE COMENTARIOS


  //PARA ALMACENAR LOS DATOS DEL POST Y PODER EDITARLOS
  const [initialTitle, setInitialTitle] = useState(''); // GUARDA EL TITULO INICIAL PARA VOLVER A PINTARLO EN EDITAR
  const [initialBody, setInitialBody] = useState(''); // GUARDA EL BODY INICIAL PARA VOLVER A PINTARLO EN EDITAR

  const [isEditing, setIsEditing] = useState(false); // HABILITA Y DESHABILITA EL MODO DE EDICION
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');


  //ID DEL POST SELECIONADO DE LOCALSTORAGE QUE VIENE DESDE EL HOME
  const idPost = localStorage.getItem('selectedPostId')

  useEffect(() => {
    async function fetchData() {
      try {
        const post = await getUserDataById(idPost);
        if (post) {
          setpostData([post]);
          setpostId(post.id) //GUARDA EL ID DEL POST PARA EL COMENTARIO
          setEditedTitle(post.title)
          setEditedBody(post.body)

          setInitialTitle(post.title); // Guardar el título inicial al cargar
          setInitialBody(post.body); // Guardar el cuerpo inicial al cargar


          //BUSCAR DATOS DEL USUARIO POR MEDIO DEL USERID DEL POST CREADO
          try {
            const user = await getUserDataPostById(post.userId);
            //console.log(user);
            if (user) {
              setuserData([user]);
            } else {
              console.log('No se encontró el usuario del post');
              return null;
            }
          } catch (error) {
            console.error('Error al obtener el post:', error);
          }

        } else {
          console.log('No se encontró el post con ese ID');
        }
      } catch (error) {
        console.error('Error al obtener el post:', error);
        // Maneja el error según tus necesidades
      }
    }
    fetchData();
  }, [idPost]);

  //ESTE MOTODO SE EJECUTA Y TRAE LOS COEMNTARIOS DE LA BASE DE DATOS Y CREA UN NUEVO ARRAY DE LOS COMENTARIOS Y EL USERNAME DE SU CREADOR SEGUN EL ID DEL POST QUE ESTÉ 
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsByPostId(postId);
  
        if (comments.length === 0) {
          setCommentsData([{ body: 'No hay comentarios', username: null }]);
        } else {

          const commentsData = comments.map(comment => ({
            body: comment.body,
            username: comment.user ? comment.user.username : null
          }));
          setCommentsData(commentsData);
        }
      } catch (error) {
        console.error('Error al obtener comentarios:', error.message);
      }
    };
  
    fetchComments();
  }, [postId, reloadData]);
  

  //CARGA LAS ESTRELLAS SEGUN SUS REACCIONES
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < rating ? 'star active' : 'star'}>&#9733;</span>
        ))}
      </div>
    );
  };


  /********************************* EDITAR **********************************************/

  const handleSave = async () => {
    try {
      const postId = localStorage.getItem('postId');
      console.log(editedTitle)
      console.log(editedBody)
      await updatePostById(postId, { title: editedTitle, body: editedBody });

      // Actualizar el estado postData con los nuevos datos del post editado
      setpostData((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, title: editedTitle, body: editedBody } : post
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleCancel = () => {
    setEditedTitle(initialTitle); // Revertir los cambios al título original
    setEditedBody(initialBody); // Revertir los cambios al cuerpo original
    setIsEditing(false); // Salir del modo de edición
  };

  /********************************* EDITAR **********************************************/

  /***********************************COMENTARIOS*********************************/
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const idUserLocalStorage = localStorage.getItem('idUser');
    const userNameLocalStorage = localStorage.getItem('nombre');
    console.log(idUserLocalStorage)
    if (comment.trim() !== '') {//SI EL COEMNTARIO ESTA LLENO ENTONCES GUARDELO
      await uploadComments(comment, postId, idUserLocalStorage, userNameLocalStorage);
      setComment(''); // LIMPIAR CAMPO

      setReloadData((prev) => !prev); // Cambia el estado para forzar la recarga de datos


    } else {
      setErrorMessage('Ingresa un comentario antes de enviar.');
      // Después de 3 segundos, eliminar el mensaje de error
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  /***********************************COMENTARIOS********************************/
  return (
    <div className='container'>
      <Navigation />
      <div className="ver-post-container">
        <div>
          {postData.map((post) => (
            <div className="post" key={post.id}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="title-input" // Clase para mantener los estilos del título
                    placeholder="Título"
                  />
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    rows={4}
                    cols={50}
                    className="body-textarea" // Clase para mantener los estilos del cuerpo del post
                    placeholder="Cuerpo del post..."
                  />
                  <div className="button-container">
                    <button onClick={handleSave} className="btn btn-primary mt-2" >Save Changes</button>
                    <button onClick={handleCancel} className="btn btn-danger mt-2">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-body">{post.body}</p>
                  {userData.map((user) => (
                    <p className='p-Autor'> Author: {user.name}</p>
                  ))}
                  <StarRating rating={post.reactions} />

                  <div className="comment-section">
                    {/* Caja de texto para el comentario */}
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Agrega tu comentario..."
                      rows={4}
                      cols={50}
                      className="comment-textarea"
                    />
                    <button
                      variant="success"
                      className="btn btn-success mt-2"
                      onClick={handleCommentSubmit}
                    >Send comment
                    </button>
                    {/*MENSAJE COMENTARIO GUARDADO EXITOSAMENTE*/}
                    {errorMessage && (
                      <div className="error-message">
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    {/* Comentarios con nombres de usuario */}
                    {post.comments && post.comments.map((comment, index) => (
                      <div key={index} className="comment-with-user">
                        <p className="comment">{comment.text}</p>
                        <p className="username">Username: {comment.username}</p>
                      </div>
                    ))}
                  </div>


                  <br />
                  <h1 className='title.comments'>Comments</h1>
                  {commentsData.map((comment, index) => (
                    <div key={index} className="comment-with-user">
                      <p className="username">{comment.username}</p>
                      <p className="body">{comment.body}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
export default VerPost;