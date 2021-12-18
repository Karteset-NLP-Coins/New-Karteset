import { db, arrayRemove } from "../firebase";

const deleteCard = async (cardID, documentID, setCardsIDS) => {
  try {
    console.log("Deleting card");
    // delete card from card collection
    await db.collection("card").doc(cardID).delete();
    // delete the cardID from document array
    const cardsIDSRef = db.collection("document").doc(documentID);
    const data = await cardsIDSRef.get();
    const document = data.data();
    const cardsIDS = document.cardsIDS;
    var indexToDelete = cardsIDS.indexOf(cardID);
    if (indexToDelete > -1) {
      cardsIDS.splice(indexToDelete, 1);
    }
    cardsIDSRef.set({ ...document, cardsIDS });
    if (setCardsIDS !== undefined) {
      setCardsIDS([]);
      setCardsIDS([...cardsIDS]);
    }
    console.log("Card deleted!");
  } catch (e) {
    console.log("Got an error deleting card");
    console.log(e);
  }
};

const deleteDocument = async (documentID, FolderID, setDocumentsIDS) => {
  try {
    console.log("Deleting Document");
    // deleting all cards from doc
    const documentRef = db.collection("document").doc(documentID);
    const docData = await documentRef.get();
    const document = docData.data();
    const cardsIDS = document.cardsIDS;
    for (const ID of cardsIDS) {
      await deleteCard(ID, documentID);
    }
    // deleting the doc
    await db.collection("document").doc(documentID).delete();
    // deleting the doc from folder
    const documentsIDSRef = db.collection("folder").doc(FolderID);
    const folderData = await documentsIDSRef.get();
    const folder = folderData.data();
    const documentsIDS = folder.documentsIDS;
    var indexToDelete = documentsIDS.indexOf(documentID);
    if (indexToDelete > -1) {
      documentsIDS.splice(indexToDelete, 1);
    }
    if (setDocumentsIDS !== undefined) {
      setDocumentsIDS([]);
      setDocumentsIDS([...documentsIDS]);
    }
    documentsIDSRef.set({ ...folder, documentsIDS });
    console.log("Document deleted");
  } catch (e) {
    console.log("Got an error deleting doc");
    console.log(e);
  }
};

const deleteFolder = async (folderID, userID, setFoldersIDS) => {
  try {
    console.log("Deleting Folder");
    // deleting all docs
    const folderRef = db.collection("folder").doc(folderID);
    const folderData = await folderRef.get();
    const folder = folderData.data();
    const documentsIDS = folder.documentsIDS;
    for (const ID of documentsIDS) {
      await deleteDocument(ID, folderID);
    }
    // deleting the folder
    await db.collection("folder").doc(folderID).delete();
    // deleting the folder from user
    const userIDRef = db.collection("users").doc(userID);
    const userData = await userIDRef.get();
    const user = userData.data();
    const foldersIDS = user.foldersIDS;
    var indexToDelete = foldersIDS.indexOf(folderID);
    if (indexToDelete > -1) {
      foldersIDS.splice(indexToDelete, 1);
    }
    userIDRef.set({ ...user, foldersIDS });
    if (setFoldersIDS !== undefined) {
      setFoldersIDS([]);
      setFoldersIDS([...foldersIDS]);
    }
    console.log("Folder deleted");
  } catch (e) {
    console.log("Got an error deleting folder");
    console.log(e);
  }
};

const deleteClass = async (classID, userID, setClassesIDS) => {
  try {
    console.log("Deleting Class");
    // deleting all folders from user
    const classRef = db.collection("class").doc(classID);
    const classData = await classRef.get();
    const currClass = classData.data();
    const foldersIDS = currClass.foldersIDS;
    const studentsIDS = currClass.studentsIDS;
    for (const ID of foldersIDS) {
      await deleteFolder(ID, userID);
    }
    // deleting the class from user
    const userIDRef = db.collection("users").doc(userID);
    const userData = await userIDRef.get();
    const user = userData.data();
    const classesIDS = user.classesIDS;
    var indexToDelete = classesIDS.indexOf(classID);
    if (indexToDelete > -1) {
      classesIDS.splice(indexToDelete, 1);
    }
    userIDRef.set({ ...user, classesIDS });
    if (setClassesIDS !== undefined) {
      setClassesIDS([]);
      setClassesIDS([...classesIDS]);
    }
    // delete class from each user registered to the class
    for (const studentID of studentsIDS) {
      const studentRef = db.collection("users").doc(studentID);
      await studentRef.update({
        classesIDS: arrayRemove(classID),
      });
    }
    // deleting the class
    await db.collection("class").doc(classID).delete();
    console.log("Class deleted");
  } catch (e) {
    console.log("Got an error deleting folder");
    console.log(e);
  }
};

const deleteComponent = (
  idToDelete,
  parentIDToDelete,
  setComponentIDS,
  type
) => {
  switch (type) {
    case "doc":
      deleteDocument(idToDelete, parentIDToDelete, setComponentIDS);
      break;
    case "folder":
      deleteFolder(idToDelete, parentIDToDelete, setComponentIDS);
      break;
    case "class":
      deleteClass(idToDelete, parentIDToDelete, setComponentIDS);
      break;
  }
};

export { deleteCard, deleteComponent };
