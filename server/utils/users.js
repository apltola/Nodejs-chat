class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users = [...this.users, user];
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(alkio => alkio.id !== id);
    }
    return user;
  }

  getUser(id) {
    return this.users.find(alkio => alkio.id === id);
  }

  getUserList(room) {
    const users = this.users.filter(alkio => alkio.room === room);
    return users.map(alkio => alkio.name);
  }
}

module.exports = {
  Users: Users
}