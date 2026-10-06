// Módulo de Sincronização Automática entre LocalStorage e Firebase Firestore
const DataSync = {
  // Salvar dados (atualiza localmente e envia para a nuvem em segundo plano)
  async save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      if (typeof db !== 'undefined') {
        await db.collection('laser_expert_data').doc(key).set({
          content: data,
          updatedAt: new Date()
        });
        console.log(`[Firebase] Sincronizado com sucesso: ${key}`);
      }
    } catch (err) {
      console.warn(`[Firebase] Modo offline ativado para ${key}:`, err);
    }
  },

  // Carregar dados (tenta buscar da nuvem primeiro para atualizar entre dispositivos; se falhar, usa o local)
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
      console.warn(`[Firebase] A carregar do cache local para ${key}:`, err);
    }

    // Fallback para o localStorage caso esteja offline
    const local = localStorage.getItem(key);
    return local ? JSON.parse(local) : null;
  }
};
