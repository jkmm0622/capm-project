using { btp.student as db } from '../db/Student';

service StudentService @(path:'/api/v1/students'){
    entity StudentList as projection on db.BasicInfo;
    action createStudent(id : StudentList:id , name : String , age : String , address : String);
}
