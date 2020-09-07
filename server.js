const express = require('express');
const app = express();
const itemsRouter = require('./routes/items');
const cors = require('cors');
const port = 7000;

app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);
app.listen(port, () => console.log(`server started on port ${port}`));