import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './list.scss';
import { getUserById} from '../../service/Services';


function List({ data, onTagClick }) {

  const [idpost, setIdPost] = useState(null);
  const navigate = useNavigate();

  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < rating ? 'star active' : 'star'}>&#9733;</span>
        ))}
      </div>
    );
  };

  const NameUser = ({ userId }) => {
    const [userName, setUserName] = useState("Unknown");

    useEffect(() => {
      // Assuming you have a function to get user data from Firestore
      // Replace 'getUserDataById' with your actual function
      const fetchUserData = async () => {
        try {
          const userData = await getUserById(userId);
          if (userData) {
            setUserName(userData.name);
            console.log('Sirve el buscar nombre');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          console.log('No sirve el buscar nombre');
        }
      };

      fetchUserData();
    }, [userId]);

    return <p>Author: {userName}</p>;
  };

  const HandlePostClick = (postId) => {
    localStorage.setItem('selectedPostId', postId);
    setIdPost(postId);
    navigate('/InfoPost');
  };

  const listPosts = data.map((post) => (
    <button
      key={post.id}
      className="post"
      id={post.id}
      onClick={() => HandlePostClick(post.id)}
    >
      <h2>{post.title}</h2>
      <p>{post.body ? post.body.split('.')[0] : ''}</p>
      <NameUser userId={post.userId} />
      <StarRating rating={post.reactions} />

      <div className="tags">
        {/* Check if post.tags is defined before mapping over it */}
        {post.tags && post.tags.map((tag, index) => (
          <button
            key={index}
            className="tag-button"
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </button>
  ));

  return (
    <main className="content">
      <div className="grid-container">{listPosts}</div>
    </main>
  );
};

export default List;