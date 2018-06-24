const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var users = undefined;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '123',
        name: 'allu',
        room: 'chatroom1'
      },
      {
        id: '124',
        name: 'jaakko',
        room: 'chatroom2'
      },
      {
        id: '125',
        name: 'ismael',
        room: 'chatroom1'
      },
    ]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'allu',
      room: 'lords of the underworld'
    };

    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    users.removeUser('123');
    expect(users.users.length).toBe(2);
  })

  it('should NOT remove a user', () => {
    users.removeUser('123123');
    expect(users.users.length).toBe(3);
  })

  it('should find a user with valid id', () => {
    expect(users.getUser('123').name).toEqual('allu');
  })

  it('should NOT find a user with invalid id', () => {
    expect(users.getUser('123456')).toBe(undefined);
  })
  
  it('should return names for chatroom1', () => {
    expect (users.getUserList('chatroom1')).toEqual(['allu', 'ismael'])
  })

  it('should return names for chatroom2', () => {
    expect (users.getUserList('chatroom2')).toEqual(['jaakko'])
  })
});