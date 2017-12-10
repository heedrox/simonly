import Firebase from 'firebase';

const buildUserData = (name, userId) => ({
  name,
  userId,
  score: 0,
  userAgent: window.navigator.userAgent,
  lastUpdateDate: Firebase.database.ServerValue.TIMESTAMP,
  state: 'welcome',
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
    return this.updatePropertyValue('lastUpdate', Firebase.database.ServerValue.TIMESTAMP);
  }

  updateScore(score) {
    return this.updatePropertyValue('score', score);
  }

  updateState(state) {
    return this.updatePropertyValue('state', state);
  }

  getUserId() {
    return this.userId;
  }

  setMasterUser() {
    this.db.ref(`${this.nameOfFamily}/master-player`).set(this.userId);
  }

  updatePropertyValue(property, value) {
    if (this.connectedNode) {
      return this.connectedNode.child(property).set(value);
    }
    return Promise.resolve();
  }

  getPlayers() {
    return this.db.ref(`${this.nameOfFamily}/players`).orderByChild('scoreDesc');
  }

}
