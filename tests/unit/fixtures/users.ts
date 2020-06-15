import User from 'src/models/user';

const users: Array<User> = [
  {
    username: 'john.doe',
    password: 'secretpassword',
    name: 'John',
    email: 'john.doe@fake.com',
    creationDate: new Date(),
  },
];

export default users;
