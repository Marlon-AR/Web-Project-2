import {db} from '../client/firebase-config';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    deleteDoc,
    getDocs,
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
export const uploadComments = async(userInfo) => {
  try {
      const commentsDocRef = await addDoc(collection(db,'comments'),userInfo);
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