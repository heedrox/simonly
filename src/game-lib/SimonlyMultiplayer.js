import Firebase from 'firebase';

const buildUserData = (name, userId) => ({
  name,
  userId,
  score: 0,
  userAgent: window.navigator.userAgent,
  lastUpdateDate: Firebase.database.ServerValue.TIMESTAMP,
});

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
    const handleConnection = resolve => (isConnected) => {
      if (isConnected.val() === true) {
        this.connectedNode = this.connectedNode || myConnectionsRef.push();
        this.userId = this.connectedNode.key;
        this.connectedNode.onDisconnect().remove();
        this.connectedNode.set(buildUserData(name, this.userId))
          .then(() => resolve());
      }
    };

    return new Promise((resolve) => {
      connectedRef.on('value', handleConnection(resolve));
    });
  }

  updateLastUpdate() {
    this.updatePropertyValue('lastUpdate', Firebase.database.ServerValue.TIMESTAMP);
  }

  updateScore(score) {
    this.updatePropertyValue('score', score);
  }

  getUserId() {
    return this.userId;
  }

  setMasterUser() {
    this.db.ref(`${this.nameOfFamily}/master-player`).set(this.userId);
  }

  updatePropertyValue(property, value) {
    if (this.connectedNode) {
      this.connectedNode.child(property).set(value);
    }
  }

}
