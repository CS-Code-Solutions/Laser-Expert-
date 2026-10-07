// Configuração do Firebase para o projeto Laser Expert
const firebaseConfig = {
  apiKey: "AIzaSyDWoTDe-LCuHg1GriVFHmVhAyNIL06PRr0",
  authDomain: "otavio-b80a5.firebaseapp.com",
  projectId: "otavio-b80a5",
  storageBucket: "otavio-b80a5.firebasestorage.app",
  messagingSenderId: "54639570167",
  appId: "1:54639570167:web:b68950efc1bce86495b7f2"
};

// Inicializar o Firebase (versão Compat para HTML estático)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Instâncias globais para uso na aplicação
const db = firebase.firestore();
const auth = firebase.auth();
