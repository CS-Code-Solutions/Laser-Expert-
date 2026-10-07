import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configuração atualizada do projeto Otávio (ID: otavio-b80a5)[span_1](start_span)[span_1](end_span)
const firebaseConfig = {
  apiKey: "AIzaSyDwOTE-LCUmG3RIVFmwVhAYiIL06PRx0",
  authDomain: "otavio-b80a5.firebaseapp.com",
  projectId: "otavio-b80a5",
  storageBucket: "otavio-b80a5.firebasestorage.app",
  messagingSenderId: "54639570167",
  appId: "1:54639570167:web:b68950efc1bce86495b7f2"
};

// Inicialização dos serviços do Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
