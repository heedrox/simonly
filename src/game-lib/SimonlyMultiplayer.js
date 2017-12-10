/* eslint-disable no-unused-vars,class-methods-use-this */
import Firebase from 'firebase';

export default class SimonlyMultiplayer {

  constructor(db, nameOfFamily) {
    this.db = db;
    this.nameOfFamily = nameOfFamily;
    this.connectedNode = null;
    this.userId = null;
  }

  setPresence(name) {
    const myConnectionsRef = this.db.ref(`${this.nameOfFamily}/players`);

    const connectedRef = this.db.ref('.info/connected');

    const handleConnection = (isConnected) => {
      if (isConnected.val() === true) {
        this.connectedNode = this.connectedNode || myConnectionsRef.push();
        this.userId = this.connectedNode.key;
        this.connectedNode.onDisconnect().remove();
        this.connectedNode.set({
          name,
          score: 0,
          userAgent: window.navigator.userAgent,
          userId: this.userId,
        });
        this.updateLastUpdate();
      }
    };

    connectedRef.on('value', handleConnection);
  }

  updateLastUpdate() {
    if (this.connectedNode) {
      this.connectedNode.child('lastUpdate').set(Firebase.database.ServerValue.TIMESTAMP);
    }
  }

  getUserId() {
    return this.userId;
  }

}
