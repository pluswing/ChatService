import { OperatorDAO } from './Operator';

const dao = new OperatorDAO();
/*
dao.create('hoge', 'loginId001', 'password').then((o) => {
    console.log(o);
});
*/
/*
dao.availableLoginId('loginId001').then((b) => {
    console.log(b);
});
*/

dao.find('loginId003').then(async (o) => {
    if (!o) {
        console.log('not found.');
        return;
    }
    // o.name = 'aaa';
    // o.password = 'hoge'; // NG
    // o.changePassword('hoge'); // OK
    o.loginId = 'loginId002';
    await dao.update(o);
    const os = await dao.findAll();
    console.log(os);
});

/*
dao.login('loginId001', 'passworda').then((o) => {
    console.log(o);
});
*/
