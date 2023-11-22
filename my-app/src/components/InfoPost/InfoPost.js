import React, { useEffect, useState } from 'react';
import { getUserDataById } from '../../service/Services';

const VerPost=() => {
  const [postData, setpostData] = useState([]);
  const idPost = 'q6hHHg0sOQv4ZPLJ5VTU'//ENVIAR EL ID DEL POST SELECIONADO DESDE EL HOME

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

  return (
    <div >
      <h1 >Post</h1>
      <div >
        {postData.map((post) => (
          <div key={post.id} >
            <h3>Titulo: <br/>{post.title}</h3>
            <p>Cuerpo: <br/>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default VerPost;