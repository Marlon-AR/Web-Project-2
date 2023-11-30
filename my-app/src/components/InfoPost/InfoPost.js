import React, { useEffect, useState } from 'react';
import { getUserDataById, deletePostById, getUserDataPostById, uploadComments } from '../../service/Services';
import '../InfoPost/infoPost.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de importar el Modal y Button de react-bootstrap
//import { useNavigate } from 'react-router-dom';

const VerPost=() => {
  const [postData, setpostData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //PARA GUARDAR LAS VARIABLES DE COMENTARIOS
  const [comment, setComment] = useState('');
  const [postId, setpostId] = useState('');
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');

  //const navigate = useNavigate(); //SE UNSA EN EL METODO DE 'confirmDelete'


  const idPost = '9f2GZZ0s1Ywlf4VE0C7V'//ENVIAR EL ID DEL POST SELECIONADO DESDE EL HOME
  localStorage.setItem('postId', idPost);//guardar en local esta linea la tengo que borrar luego.kassandra ya me va asubir el iddel post

  useEffect(() => {
    async function fetchData() {
      try {
        const post = await getUserDataById(idPost);
        if (post) {
          setpostData([post]);
          setpostId(post.id) //GUARDA EL ID DEL POST PARA EL COMENTARIO

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

  /********************************* EDITAR **********************************************/
  const handleEdit = (postId) => {
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
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {userData.map((user) =>(
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
              uploadComments(comment,postId,userId,userName)
              setComment('');//LIMPIAR CAMPO
            }}>Enviar comentario</button>
          </div>
          
          <div className="button-container">
            <button className="btn btn-primary mt-2"  onClick={() => handleEdit(post.id)}>Editar</button>
            <span style={{ margin: '0 5px' }}></span> {/* Solo Agrega un Espacio entre los botones de boostrap */}
            <button className="btn btn-danger mt-2" onClick={() => handleDelete(post.id)} disabled>Eliminar</button>
          </div>

        </div>
      ))}
    </div>
    </div>
  );
}
export default VerPost;