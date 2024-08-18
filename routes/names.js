const express = require('express');
const router = express.Router();
const Name = require('../models/Name.js');
const app = express();  
const PORT = process.env.PORT || 3000;

// GET all names
router.get('/', async (req, res) => {
  try {
    const names = await Name.find();
    res.json(names);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
// POST /api/names 用于保存新名字  
app.post('/api/names', async (req, res) => {  
  const { name } = req.body;  
  if (!name) {  
      return res.status(400).send('Please provide a name');  
  }  
  try {  
      const newName = await Name.create({ name });  
      res.send({ message: 'Name saved successfully', name: newName });  
  } catch (err) {  
      res.status(500).send(err);  
  }  
});  

// GET /api/names 用于获取所有已保存的名字  
app.get('/api/names', async (req, res) => {  
  try {  
      const names = await Name.find().sort({ createdAt: -1 }); // 按创建时间降序排列  
      res.json({ names });  
  } catch (err) {  
      res.status(500).send(err);  
  }  
});  

// 设置JSON中间件  
app.use(express.json());  

// 启动服务器  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);  
});

// POST a new name
router.post('/', async (req, res) => {
  const name = new Name({
    name: req.body.name
  });

  try {
    const savedName = await name.save();
    res.status(201).json(savedName);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;