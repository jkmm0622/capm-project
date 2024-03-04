const cds = require('@sap/cds')

module.exports = async function (){
    
    const db = await cds.connect.to('db');      // connect to database service
    const { BasicInfo } = db.entities;          // get reflected definitions

  this.before ('READ','StudentList', async (req) => {
    console.log('Before read');
  });

  this.on ('READ','StudentList', async (req,next) => {
    console.log('On read');
    return await SELECT.from(BasicInfo);
  });

  this.after ('READ','StudentList', async (students,req) => {
    console.log('After read');
  });

}