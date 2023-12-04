import React, { useState, useEffect } from 'react';
import List from './List';
import { getPostByIdUser, getAllPostsFromFirestore } from '../../service/Services';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigator/navigator';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);
  const [selectedTag, setSelectedTag] = useState(null); // Para almacenar el tag seleccionado
  const iduser = localStorage.getItem('idUser');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPosts = await getPostByIdUser(iduser);
        setAllPosts(userPosts);
      } catch (error) {
        console.error('Error al obtener el postInfo:', error);
        // Maneja el error según tus necesidades
      }
    };

    fetchData();
  }, [iduser]);

  const handleViewUserPost = async () => {
    try {
      const userPosts = await getPostByIdUser(iduser);
      setAllPosts(userPosts);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al obtener el postInfo:', error);
      // Maneja el error según tus necesidades
    }
  };

  const handleViewAllPost = async () => {
    try {
      // Assuming there's a service function to get all posts from Firestore
      // Modify the following line based on your actual service function
      const allPostsFromFirestore = await getAllPostsFromFirestore();
      setAllPosts(allPostsFromFirestore);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al obtener todos los posts:', error);
      // Maneja el error según tus necesidades
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (selectedTag) {
      const filteredPosts = allPosts.filter((post) =>
        post.tags.includes(selectedTag)
      );
      setCurrentPage(1);
      setAllPosts(filteredPosts);
    }
  }, [selectedTag, allPosts]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);

    if (tag) {
      const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));
      setAllPosts(filteredPosts);
    }
  };

  const createPost = () => {
    navigate('/postForm');
  };

  return (
    <div>
      <Navigation />
      <div className='buttons'>
        <div className='btn-viewposts'>
          <p>See posts by:</p>
          <button className='btn-user' onClick={handleViewUserPost}>
            USER
          </button>
          <button className='btn-all' onClick={handleViewAllPost}>
            ALL
          </button>
          <button className='btn-create' onClick={createPost}>
            CREATE POST
          </button>
        </div>
        {allPosts.length ? (
          <List data={currentPosts} onTagClick={handleTagClick} />
        ) : (
          <p>Loading</p>
        )}
        <div className='btn-page'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className='btn-last'
          >
            Last
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === 2} // Update this condition based on your actual data
            className='btn-next'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;