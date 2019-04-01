import { UserMessageDAO, UserMessage } from './UserMessage';

const dao = new UserMessageDAO();

dao.add(new UserMessage(5, 'bbbb')).then(async () => {
    const rows = await dao.histories(5);
    console.log(rows);
});
