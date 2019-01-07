const app = require('express')();

const { COLOR } = process.env;
const PORT = 3000;

app.get('/', (req, res) => res.send(`HUGE Hello from ${COLOR} container!`));

app.listen(
    PORT,
    () => console.log(`${COLOR} container listening closely on port ${PORT}...`)
);

