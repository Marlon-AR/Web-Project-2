import { useEffect } from 'react';
import { getUserDataById } from '../../service/Services';
import { useNavigate } from 'react-router-dom';

const InfoPostFiltro = () => {
  const idPost = localStorage.getItem('selectedPostId');
  const idUser = localStorage.getItem('idUser');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const post = await getUserDataById(idPost);

        if (post.userId === idUser) {
          navigate('/infoPost');
        } else {
          navigate('/infoPost2');
        }
      } catch (error) {
        console.error('Error al obtener el post:', error);
      }
    }

    fetchData();
  }, [idPost, idUser, navigate]);

  return null;
};

export default InfoPostFiltro;
