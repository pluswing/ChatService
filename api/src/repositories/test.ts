import { UserDAO } from './User';

const dao = new UserDAO();

dao.findOrCreate('10').then((r) => {
    console.log('*** RES ***');
    console.log(r);
});
