// Módulo avançado de Sincronização em Tempo Real (Firestore + LocalStorage)
const DataSync = {
  // Salvar dados (atualiza localmente e envia para o Firestore)
  async save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    try {
      if (typeof db !== 'undefined') {
        await db.collection('laser_expert_data').doc(key).set({
          content: data,
          updatedAt: new Date()
        });
        console.log(`[Firebase Realtime] Dados salvos e sincronizados: ${key}`);
      }
    } catch (err) {
      console.warn(`[Firebase] Modo offline - dados salvos apenas localmente para ${key}:`, err);
    }
  },

  // Carregar dados (busca da nuvem ou fallback para o cache local)
  async load(key) {
    try {
      if (typeof db !== 'undefined') {
        const docRef = await db.collection('laser_expert_data').doc(key).get();
        if (docRef.exists) {
          const remoteData = docRef.data().content;
          localStorage.setItem(key, JSON.stringify(remoteData));
          return remoteData;
        }
      }
    } catch (err) {
      console.warn(`[Firebase] Erro ao carregar ${key}, a usar cache local:`, err);
    }

    const local = localStorage.getItem(key);
    return local ? JSON.parse(local) : null;
  },

  // Ouvir alterações em tempo real na nuvem
  listen(key, callback) {
    try {
      if (typeof db !== 'undefined') {
        db.collection('laser_expert_data').doc(key).onSnapshot((doc) => {
          if (doc.exists) {
            const remoteData = doc.data().content;
            localStorage.setItem(key, JSON.stringify(remoteData));
            if (callback) callback(remoteData);
          }
        });
      }
    } catch (err) {
      console.warn(`[Firebase] Erro ao ativar escuta em tempo real para ${key}:`, err);
    }
  }
};
