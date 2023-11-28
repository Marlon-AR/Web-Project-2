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