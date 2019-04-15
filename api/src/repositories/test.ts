import { UserDAO } from './User';

const dao = new UserDAO();

dao.list().then(async (users) => {
    console.log(users);
});
