
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
//import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const TEMPERATURES_COLLECTION = 'temperatures';

export function addTemprature(uid, date, temperature){
  addDoc(collection(db,TEMPERATURES_COLLECTION), {uid, date, temperature});
}



// // Updates receipt with @docId with given information.
// export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket, isConfirmed) {
//   setDoc(doc(db, RECEIPT_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket, isConfirmed });
// }

// // Deletes receipt with given @id.
// export function deleteReceipt(id) {
//   deleteDoc(doc(db, RECEIPT_COLLECTION, id));
// }