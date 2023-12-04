import React, { useEffect, useState } from 'react';
import { 
  getUserDataById,
  deletePostById,
  getUserDataPostById,
  uploadComments,
  updatePostById,
  getCommentsByPostId }
from '../../service/Services';
import '../InfoPost/infoPost.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de importar el Modal y Button de react-bootstrap
//import { useNavigate } from 'react-router-dom';


const VerPost = () => {
  const [postData, setpostData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //PARA GUARDAR LAS VARIABLES DE COMENTARIOS
  const [comment, setComment] = useState('');
  const [postId, setpostId] = useState('');
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');

  const [commentsData, setCommentsData] = useState([]);

  //PARA ALMACENAR LOS DATOS DEL POST Y PODER EDITARLOS
  const [initialTitle, setInitialTitle] = useState(''); // GUARDA EL TITULO INICIAL PARA VOLVER A PINTARLO EN EDITAR
  const [initialBody, setInitialBody] = useState(''); // GUARDA EL BODY INICIAL PARA VOLVER A PINTARLO EN EDITAR

  const [isEditing, setIsEditing] = useState(false); // HABILITA Y DESHABILITA EL MODO DE EDICION
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  //ESTA CONSTANTE ES PARA FORZAR A REACT A REFRESCAR LA PANTALLA YA QUE AL CAMBIAR UN VALOR SE REFRESCA.
  //const [contador, setContador] = useState(0);
  //const [contador, setContador] = useState(false);
  //const navigate = useNavigate(); //SE UNSA EN EL METODO DE 'confirmDelete'


  const idPost = 'Yu5D3TxBhOQZuv35ns6h'//ENVIAR EL ID DEL POST SELECIONADO DESDE EL HOME
  localStorage.setItem('postId', idPost);//guardar en local esta linea la tengo que borrar luego.kassandra ya me va asubir el iddel post

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
              setuserId(user.aud)
              setuserName(user.name)
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
  }, []);

  /*const fetchComments = async () => {
    try {
      const comments = await getCommentsByPostId(postId);
      const userIds = comments.flatMap(comment => comment.user ? comment.user.username : null);
      console.log('nombre del usuario:', userIds.filter(username => username !== null));
      //console.log(comments);
      //console.log(userIds);

      // Obtener todos los IDs de usuario de los comentarios
      const usernames = comments.map((comment, index) => ({
        ...comment,
        username: userIds[index] ? userIds[index].username : null
      }));
      
      console.log('Comentarios con nombres de usuario:', usernames);

    } catch (error) {
      console.error('Error al obtener comentarios:', error.message);
    }
  };*/
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsByPostId(postId);
        const userIds = comments.flatMap(comment => comment.user ? comment.user.username : null);
        console.log('nombre del usuario:', userIds.filter(username => username !== null));

        console.log(comments);
        console.log(userIds);
        // Obtener todos los IDs de usuario de los comentarios
        const usernames = comments.map((comment, index) => ({
          ...comment,
          username: userIds[index] ? userIds[index].username : null
        }));
        
        //console.log('Comentarios con nombres de usuario:', usernames);
        setCommentsData(usernames); // Actualizar el estado con los comentarios y nombres de usuario
      } catch (error) {
        console.error('Error al obtener comentarios:', error.message);
      }
    };

    fetchComments(); // Llamar a la función fetchComments al montar el componente o cuando 'postId' cambie
  }, [postId]); // Ejecutar el efecto cada vez que 'postId' cambie


  /********************************* EDITAR **********************************************/
  const handleEdit = () => {
    setEditedTitle(postData[0].title);
    setEditedBody(postData[0].body);
    setIsEditing(true);
  };

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

  /********************************* MODAL **********************************************/
  const handleDelete = () => {
    setShowModal(true);
  };
  const confirmDelete = () => {
    const localIdPost = localStorage.getItem('postId');
    deletePostById(localIdPost);
    setShowModal(false);
    //navigate('/home');  DESPUES DE QUE ELIMINE EL MODAL DE UNA VEZ SE DIRIGE AL HOME
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  /********************************** MODAL *********************************************/

  /***********************************COMENTARIOS*********************************/
  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log('entro')
  };

  /***********************************COMENTARIOS********************************/
  return (
    
    <div className="ver-post-container">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <button onClick={handleSave} className="btn btn-primary mt-2" >Guardar cambios</button>
                  <button onClick={handleCancel} className="btn btn-danger mt-2">Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
                {userData.map((user) => (
                  <p className='p-Autor'>{user.name}</p>
                ))}

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
                  <button variant="success"
                    className="btn btn-success mt-2"
                    onClick={() => {
                      //console.log('Comentario enviado:', comment);
                      uploadComments(comment, postId, userId, userName)
                      setComment('');//LIMPIAR CAMPO

                    }}>Enviar comentario</button>
                    
                  {/* Comentarios con nombres de usuario */}
                  {post.comments && post.comments.map((comment, index) => (
                  <div key={index} className="comment-with-user">
                    <p className="comment">{comment.text}</p>
                    <p className="username">Username: {comment.username}</p>
                  </div>
              ))}
                </div>

                <div className="button-container">
                  <button className="btn btn-primary mt-2" onClick={() => handleEdit(post.id)}>Editar</button>
                  <span style={{ margin: '0 5px' }}></span> {/* Solo Agrega un Espacio entre los botones de boostrap */}
                  <button className="btn btn-danger mt-2" onClick={() => handleDelete(post.id)} disabled>Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
      {commentsData.map((comment, index) => (
        <div key={index} className="comment-with-user">
          <p className="comment">{comment.text}</p>
          <p className="username">Username: {comment.username}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
export default VerPost;