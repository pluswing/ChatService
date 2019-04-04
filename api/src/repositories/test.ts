import { OperatorDAO } from './Operator';

const dao = new OperatorDAO();

dao.find('loginId003').then(async (o) => {
    if (o === null) {
        console.log('not found');
        return;
    }
    o.name = 'fuga';
    await dao.update(o);
    console.log('done');
});
