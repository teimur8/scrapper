const readline = require('readline');

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return await new Promise((resolve, reject) => rl.question(query + ' 1/0', ans => {

        if (ans === '1') {
            rl.close();
            console.log('ok');
            resolve(ans);
            return;
        }

        if (ans === '0') {
            rl.close();
            console.log('false');
            reject(ans);
            return;
        }

        console.log('try again');
    }))
}


module.exports.askQuestion = askQuestion;