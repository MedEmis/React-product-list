const firestoreService = require("firestore-export-import")
const serviceAccount = require("./serviceAccountKey.json")

const databaseURL = "https://react-product-app-1c2f9-default-rtdb.europe-west1.firebasedatabase.app"

firestoreService.initializeApp(serviceAccount, databaseURL)

firestoreService.restore("data.json")