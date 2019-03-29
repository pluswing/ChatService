import { UserDAO } from './User';

const dao = new UserDAO();

dao.findOrCreate('12').then((r) => {
    console.log('*** RES ***');
    console.log(r);
});
