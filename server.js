const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const namesRoutes = require('./routes/names.js');
const app = express();
const port = process.env.PORT || 3000;

// 假设我们使用内存中的数组来存储名字  
let names = [];  

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration_board', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  // 确保在数据库连接后执行其他操作  
const db = mongoose.connection;  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// GET /api/names 用于获取所有已保存的名字  
app.get('/api/names', (req, res) => {  
  res.json({ names: names });  
});  

app.use(bodyParser.json());
app.use(cors());

// Routes// 设置JSON中间件 
app.use('/api/names', namesRoutes,express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const nameSchema = new mongoose.Schema({  
  name: String,  
  createdAt: { type: Date, default: Date.now }  
});  

const Name = mongoose.model('Name', nameSchema);