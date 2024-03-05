using { btp.student as db } from '../db/Student';

service StudentService @(path:'/api/v1/students'){
    @readonly entity StudentList as projection on db.BasicInfo;
    action createStudent(student : StudentList);
}
