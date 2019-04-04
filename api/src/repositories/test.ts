import { UserDAO } from './User';

const dao = new UserDAO();

dao.findOrCreate('123445566').then((r) => {
    console.log(r);
});
