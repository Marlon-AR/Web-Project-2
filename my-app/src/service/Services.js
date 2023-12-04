import {db} from '../client/firebase-config';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    deleteDoc,
    getDocs,
    query,
    where,
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
// VALIDAR USERS A FIRESTORE
export const uploadUserData = async (idPost) => {
  try {
    const userDocRef = doc(db, 'users', idPost);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      console.log('El usuario existe en Firestore.');
      return { id: userDocSnapshot.id, ...userDocSnapshot.data() };
    } else {
      console.log('El usuario no existe en Firestore.');
      return null;
    }
  } catch (error) {
    throw new Error('Error al buscar el usuario en Firestore: ' + error.message);
  }
};

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
// GUARDAR POSTS A FIRESTORE
export const uploadPost = async(userInfo) => {
  try {
      const userDocRef = await addDoc(collection(db,'users'),userInfo);
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

// Obtener todos los documentos de una colección
export const getAllUserData = async () => {
  try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      
      const userData = [];
      querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
      });
      
      return userData;
  } catch (error) {
      throw new Error(error.message);
  }
}

//****************************************************************
/*
// Obtener datos con una condición específica
export const getUsersByCondition = async (field, value) => {
    try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where(field, '==', value));
        const querySnapshot = await getDocs(q);

        const userData = [];
        querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data() });
        });

        return userData;
    } catch (error) {
        throw new Error(error.message);
    }
}*/