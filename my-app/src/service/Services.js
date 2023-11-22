import {db} from '../client/firebase-config';
import {
    collection,
    addDoc,
    doc,
    getDoc,
} from 'firebase/firestore';

//****************************************************************
// GUARDAR DATOS A FIRESTORE
export const uploadUserData = async(userInfo) => {
    try {
        const userDocRef = await addDoc(collection(db,'posts'),userInfo);
        return userDocRef.id
    } catch (error) {
        throw new Error(error.message);
    }
}

//****************************************************************
// OBTENER UN POST EN ESPESIFICO SEGUN SU ID DE POST
export const getUserDataById = async (idPost) => {
    try {
        const postDocRef = doc(db, 'posts', idPost);
        const postDoc = await getDoc(postDocRef);
    
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

// Obtener todos los documentos de una colección
/*export const getAllUserData = async () => {
    try {
        const usersCollectionRef = collection(db, 'posts');
        const querySnapshot = await getDocs(usersCollectionRef);
        
        const userData = [];
        querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data() });
        });
        
        return userData;
    } catch (error) {
        throw new Error(error.message);
    }
}*/



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