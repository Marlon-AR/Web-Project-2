import React, { useEffect, useState } from 'react';
import { getUserDataById,deletePostById } from '../../service/Services';
import '../InfoPost/infoPost.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de importar el Modal y Button de react-bootstrap
//import { useNavigate } from 'react-router-dom';

const VerPost=() => {
  const [postData, setpostData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //const navigate = useNavigate();


  const idPost = 'Uv7Y0cQz3LX2clfjCdQk'//ENVIAR EL ID DEL POST SELECIONADO DESDE EL HOME
  localStorage.setItem('postId', idPost);//guardar en local esta linea la tengo que borrar luego.kassandra ya me va asubir el iddel post

  useEffect(() => {
    async function fetchData() {
      try {
        const post = await getUserDataById(idPost);
        if (post) {
          //console.log(post);
          setpostData([post]);
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

  const handleEdit = (postId) => {
  };
  

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
          <div className="button-container">
            <button className="btn btn-primary mr-2" onClick={() => handleEdit(post.id)}>Editar</button>
            <span style={{ margin: '0 5px' }}></span> {/* Solo Agrega un Espacio entre los botones de boostrap */}
            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
export default VerPost;