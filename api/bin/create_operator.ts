import { OperatorDAO } from '../src/repositories/Operator';

const dao = new OperatorDAO();

const name = process.argv[2];
const loginId = process.argv[3];
const password = process.argv[4];

dao.find(loginId).then((o) => {
  if (o) { process.exit(); }
  dao.create(name, loginId, password).then(() => {
    console.log('done.');
    process.exit();
  });
});
