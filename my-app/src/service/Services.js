import {db} from '../client/firebase-config';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    deleteDoc,
    getDocs,
    updateDoc,
    query,
    where
} from 'firebase/firestore';

//****************************************************************
// GUARDAR USER A FIRESTORE
export const uploadUser = async(userInfo) => {
    try {
        const userDocRef = await addDoc(collection(db,'users'),userInfo);
        return userDocRef.id
    } catch (error) {
        throw new Error(error.message);
    }
}
//****************************************************************


//****************************************************************
// GUARDAR COMENTARIOS A FIRESTORE
export const uploadComments = async(body,postId,id,username) => {

    const commentsData = {
      body,
      postId,
      user: {
        id,
        username
      }
    };
    try {
        const commentsDocRef = await addDoc(collection(db,'comments'),commentsData);
        return commentsDocRef.id
    } catch (error) {
        throw new Error(error.message);
    }
};
//****************************************************************


//****************************************************************
// VALIDAR SI LOS USERS ESTAN EN FIRESTORE
export const uploadUserData = async (idPost,decoded) => {
  try {
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);
    const userData = [];
    
    querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
    });
    const userExists = userData.find(user => user.aud === idPost);
    
    if (userExists) {
      console.log('El usuario existe en Firestore.');
      return userExists;
    } else {
      console.log('El usuario no existe en Firestore.');
      uploadUser(decoded)
    }
     
} catch (error) {
    throw new Error(error.message);
}
};
//****************************************************************


//****************************************************************
// OBTENER UN POST EN ESPESIFICO SEGUN SU ID DE POST
export const getUserDataById = async (idPost) => {
    try {
        const postDocRef = doc(db, 'posts', idPost);
        const postDoc = await getDoc(postDocRef);
        //console.log(postDoc.id)
    
        if (postDoc.exists()) {
          return { id: postDoc.id, ...postDoc.data() };
        } else {
          return ('El documento con ese ID no existe')
        }
      } catch (error) {
        throw new Error(error.message);
      }
};
//****************************************************************

//****************************************************************

// OBTENER UN USUARIO EN ESPESIFICO SEGUN SU ID DE USUARIO
export const getUserById = async (userId) => {
  try {
    const query = collection(db, 'users');
    const snapshot = await getDocs(query);

    // Buscar el documento con el 'aud' que coincide con el 'userId'
    const userDoc = snapshot.docs.find(doc => doc.data().aud === userId);

    if (userDoc) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return ('El User no existe');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//****************************************************************
// OBTENER LOS POST DE UN USUARIO EN ESPECÍFICO SEGÚN EL idUser
export const getPostByIdUser = async (idUser) => {
  try {
    const query = collection(db, 'posts');
    const snapshot = await getDocs(query);
    
    // Filtrar los documentos que coincidan con el 'userId'
    const userPosts = snapshot.docs.filter(doc => doc.data().userId === idUser);

    // Mapear los documentos filtrados a objetos con la estructura deseada
    const postsData = userPosts.map(doc => ({ id: doc.id, ...doc.data() }));

    return postsData;
  } catch (error) {
    throw new Error('Error al obtener los posts del usuario: ' + error.message);
  }
};

//****************************************************************
// OBTENER TODOS LOS POST DE LA BD SIN IMPORTAR EL USUARIO
export const getAllPostsFromFirestore = async () => {
  try {
    const postsCollectionRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollectionRef);

    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ id: doc.id, ...doc.data() });
    });

    return allPosts;
  } catch (error) {
    console.error('Error getting all posts:', error.message);
    throw new Error(error.message);
  }
};

//****************************************************************
// OBTENER LOS DATOS USER DEL CREADOR DEL POST SELECIONADO DESDE HOME,SEGUN SU ID
export const getUserDataPostById = async (idUser) => {
  try {
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);
    const userData = [];
    
    querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
    });
    const userExists = userData.find(user => user.aud === idUser);
    
    if (userExists) {
      console.log('SI');
      return userExists;
    } else {
      console.log('NO');
    }
     
} catch (error) {
    throw new Error(error.message);
}
};
//****************************************************************

//****************************************************************
// GUARDAR POSTS A FIRESTORE
export const uploadPost = async(userInfo) => {
  try {
      const userDocRef = await addDoc(collection(db,'posts'),userInfo);
      return userDocRef.id
  } catch (error) {
      throw new Error(error.message);
  }
}

//****************************************************************
// ELIMINAR UN POST EN ESPESIFICO SEGUN SU ID DE POST
export const deletePostById = async (idPost) => {
    try {
      const postDocRef = doc(db, 'posts', idPost); // Referencia al documento que quieres eliminar
      await deleteDoc(postDocRef); // Elimina el documento usando la referencia
  
      console.log('Documento eliminado exitosamente');
    } catch (error) {
      console.error('Error al intentar eliminar el documento:', error.message);
      throw new Error(error.message);
    }
  };
  //****************************************************************

//****************************************************************
//EDITA LOS NUEVOS CAMPOS DEL POST TITULO Y CUERPO
export const updatePostById = async (postId, updatedData) => {
  try {
    console.log(postId)
    console.log(updatedData)
    const postDocRef = doc(db, 'posts', postId); // Referencia al documento del post por su ID

    await updateDoc(postDocRef, updatedData);

    console.log('¡Post actualizado exitosamente en Firestore!');
  } catch (error) {
    console.error('Error al actualizar el post en Firestore:', error);
    throw new Error(error.message);
  }
};
//****************************************************************

export const getCommentsByPostId = async (postId) => {
  try {
    const commentsCollectionRef = collection(db, 'comments');
    const commentsQuery = query(commentsCollectionRef, where('postId', '==', postId));
    const commentsSnapshot = await getDocs(commentsQuery);

    const comments = commentsSnapshot.docs.map((commentDoc) => commentDoc.data());

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};