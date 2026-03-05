import { User } from './backend/models/index.js';
import sequelize from './backend/config/database.js';

async function audit() {
    try {
        await sequelize.authenticate();
        const users = await User.findAll();
        console.log(`Total Users: ${users.length}`);
        users.forEach(u => {
            console.log(`- [${u.id}] ${u.username} (${u.email}) isAdmin: ${u.isAdmin}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

audit();
