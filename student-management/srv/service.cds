using { student.management.db as db } from '../db/schema';

service Student @(path:'/StudentService'){
    entity StudentList as projection on db.BasicInfo;
    action createStudent(id : StudentList:id , name : String , age : String , address : String);
}
