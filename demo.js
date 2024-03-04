const axios = require('axios');
const fs = require('fs');

// 用于创建FormData对象
const FormData = require('form-data');

// 文件路径
const filePath = '1.docx';

// 通过fs模块读取文件内容
const fileContent = fs.readFileSync(filePath);
console.log(fileContent)

// 创建FormData对象，并将文件内容添加到其中
const formData = new FormData();
formData.append('file', fileContent, {
  filename: '1.docx', // 指定文件名
  knownLength: fileContent.length, // 指定文件长度
});

// 其他表单数据
formData.append('tabel_name', 'hello');

// 发送POST请求
// axios.post('http://172.16.111.228:8088/upload', formData, {
//   headers: {
//     ...formData.getHeaders(), // 设置请求头，包括Content-Type
//   },
// })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });