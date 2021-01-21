const firebaseAdmin = require('firebase-admin');
const serviceAccount = './credentials.json';
const firebaseUrl = 'https://pe-athleticinjuries.firebaseio.com';

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require(serviceAccount)),
    databaseURL: firebaseUrl
});
const firestore = firebaseAdmin.firestore();

// Source: https://leechy.dev/firestore-move
export const copyDoc = async (
    collectionFrom: string,
    docIdFrom: string,
    collectionTo: string,
    docIdTo: string,
    addData: any = {},
    recursive = false,
  ): Promise<boolean> => {
    // document reference
    const docRef = firestore.collection(collectionFrom).doc(docIdFrom);
  
    // copy the document
    const docData = await docRef
      .get()
      .then((doc) => doc.exists && doc.data())
      .catch((error) => {
        console.error('Error reading document', `${collectionFrom}/${docIdFrom}`, JSON.stringify(error));
        // throw new functions.https.HttpsError('not-found', 'Copying document was not read');
      });
  
    if (docData) {
      // document exists, create the new item
      await firestore
        .collection(collectionTo)
        .doc(docIdTo)
        .set({ ...docData, ...addData })
        .catch((error) => {
          console.error('Error creating document', `${collectionTo}/${docIdTo}`, JSON.stringify(error));
        //   throw new functions.https.HttpsError(
        //     'data-loss',
        //     'Data was not copied properly to the target collection, please try again.',
        //   );
        });
  
      // if copying of the subcollections is needed
      if (recursive) {
        // subcollections
        const subcollections = await docRef.getCollections();
        for await (const subcollectionRef of subcollections) {
          const subcollectionPath = `${collectionFrom}/${docIdFrom}/${subcollectionRef.id}`;
  
          // get all the documents in the collection
          return await subcollectionRef
            .get()
            .then(async (snapshot) => {
              const docs = snapshot.docs;
              for await (const doc of docs) {
                await copyDoc(subcollectionPath, doc.id, `${collectionTo}/${docIdTo}/${subcollectionRef.id}`, doc.id, true);
              }
              return true;
            })
            .catch((error) => {
              console.error('Error reading subcollection', subcollectionPath, JSON.stringify(error));
            //   throw new functions.https.HttpsError(
            //     'data-loss',
            //     'Data was not copied properly to the target collection, please try again.',
            //   );
            });
        }
      }
      return true;
    }
    return false;
};


export const deleteDoc = async (docPath: string): Promise<boolean> => {
    // document reference
    const docRef = firestore.doc(docPath);
  
    // subcollections
    const subcollections = await docRef.getCollections();
    for await (const subcollectionRef of subcollections) {
      await subcollectionRef
        .get()
        .then(async (snapshot) => {
          const docs = snapshot.docs;
          for await (const doc of docs) {
            await deleteDoc(`${docPath}/${subcollectionRef.id}/${doc.id}`);
          }
          return true;
        })
        .catch((error) => {
          console.error('Error reading subcollection', `${docPath}/${subcollectionRef.id}`, JSON.stringify(error));
          return false;
        });
    }
  
    // when all subcollections are deleted, delete the document itself
    return docRef
      .delete()
      .then(() => true)
      .catch((error) => {
        console.error('Error deleting document', docPath, JSON.stringify(error));
        return false;
      });
};


export const moveDoc = async (
    collectionFrom: string,
    docIdFrom: string,
    collectionTo: string,
    docIdTo: string,
    addData?: any,
): Promise<boolean | Error> => {
    // copy the organisation document
    const copied = await copyDoc(collectionFrom, docIdFrom, collectionTo, docIdTo, addData, true);
  
    // if copy was successful, delete the original
    if (copied) {
      await deleteDoc(`${collectionFrom}/${docIdFrom}`);
      return true;
    }
    // throw new functions.https.HttpsError(
    //   'data-loss',
    //   'Data was not copied properly to the target collection, please try again.',
    // );
};

export const generateDocId = (
    length: number = 20,
    chars: string = "#aA"
) => {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

export const updateDocId = async (collectionId: string = "body-parts") => {
    const colRef = await firestore.collection(collectionId).get();
    for await (const doc of colRef.docs) {
        const subcollections = await firestore.doc(collectionId + "/" + doc.id).getCollections();
        for await (const subcollectionRef of subcollections) {
            const subdocs = await subcollectionRef.get();
            for await (const sd of subdocs.docs) {
                if (sd.id.length <= 3) {
                    const id = generateDocId(20 - (sd.id.length+1))
                    moveDoc(subcollectionRef.path, sd.id, subcollectionRef.path, sd.id + "_" + id)
                }
            }
        }
    }
};
updateDocId();

moveDoc("body-parts/test921923/stretching", "t2", "body-parts/test921923/stretching", "t5");