import { sequelize, Product } from './backend/models/index.js';

async function checkDupes() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');

        const products = await Product.findAll();
        console.log(`Total products: ${products.length}`);

        const nameMap = {};
        const dupes = [];

        products.forEach(p => {
            if (nameMap[p.name]) {
                dupes.push(p.name);
            }
            nameMap[p.name] = true;
        });

        if (dupes.length > 0) {
            console.log('Found duplicates:');
            const uniqueDupes = [...new Set(dupes)];
            uniqueDupes.forEach(name => {
                const count = products.filter(p => p.name === name).length;
                console.log(`- ${name} (${count} occurrences)`);
            });
        } else {
            console.log('No duplicates found by name.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
}

checkDupes();
