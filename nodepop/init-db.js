const readline = require('readline');
const Advertisements = require('./models/Advertisements');

async function main() {
    const confirmation = await getConfirmation('Are you sure you want to delete and reset the database? [n]'); 
    if(!confirmation) {  
        process.exit();
    }

    const connection = require('./lib/connectMongoose');

    await initAds();

    connection.close();
}

main().catch(err => console.log('An error occured:', err));

async function initAds() {
    const removed = await Advertisements.deleteMany();
    console.log(`You have removed ${removed.deletedCount} ads`);

    const added = await Advertisements.insertMany([
        { name : 'Bike', forSale : true, price : 230.15, photo : './public/images/bike.jpg', tags : ['lifestyle', 'motor']},
        { name : 'iPhone 3GB', forSale : false, price : 50.00, photo : './public/images/iphone.jpg', tags : ['lifestyle', 'mobile']},
        { name : 'Mouse', forSale : false, price : 20.50, photo : './public/images/mouse.jpg', tags : ['work']},
        { name : 'Tablet', forSale : true, price : 500.60, photo : './public/images/tablet.jpg', tags : ['mobile', 'work']},
    ]);
    console.log(`You have inserted ${added.length} ads`)
}

function getConfirmation(text) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {
            interface.close();
            if(answer.toLowerCase() === 'yes') {
                resolve(true);
                return
            }
            resolve(false);
        })
    })
}