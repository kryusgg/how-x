import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD0OJnmxW5Bi617ZdOPNHr71pcLew7RNlE",
  authDomain: "conecta-itajai.firebaseapp.com",
  projectId: "conecta-itajai",
  storageBucket: "conecta-itajai.firebasestorage.app",
  messagingSenderId: "142195562992",
  appId: "1:142195562992:web:5f23900bb7aee4173da535"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }