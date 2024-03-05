const cds = require('@sap/cds');

module.exports = async function (){

  const db = await cds.connect.to('db');      // connect to database service
  const { BasicInfo } = db.entities;          // get reflected definitions

  this.on ('READ','StudentList', async (req) => {
    const [ id ]  = req.params;
    if(id){
      console.log(id.id);
      return await SELECT.from(BasicInfo).where ({ id: id.id }) 
    }
    return await SELECT.from(BasicInfo);
  });

  this.after ('READ','StudentList', async (students,req) => {
    return students.map((item) => {
      switch(item.status) {
        case 'F':
          item.status = 'Fail';
          break;
        case 'P':
          item.status = 'Pass';
          break;
      }
      return item;
    });
  });
  
  this.before('createStudent' , async (req) => {
    const { student } = req.data;
    if( !student.id || !student.name || !student.age || !student.address || !student.status ){
      return req.error(500,'Please provide valid payload')
    }
  });

  this.on('createStudent' , async (req) => {
    const { student } = req.data;
    console.log(student);
    return await INSERT.into (BasicInfo) .entries (student);
  });

}