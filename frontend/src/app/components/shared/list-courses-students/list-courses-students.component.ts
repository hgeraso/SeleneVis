import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseFollowService } from 'src/app/services/course-follow.service';
import { StudentService } from 'src/app/services/student.service';
import { studentCourse } from 'src/app/models/studentCourse';

@Component({
  selector: 'list-courses-students',
  templateUrl: './list-courses-students.component.html',
  styleUrls: ['./list-courses-students.component.css']
})
export class ListCoursesStudentsComponent implements OnInit {

  @Output() sendbody = new EventEmitter<studentCourse>();
  @Output() sendcourse = new EventEmitter<string>();

  body: studentCourse = { course: '', student: '' }
  courses = [];
  Students = [];
  selectUser = false;

  constructor(private serviceCourse: CourseFollowService, private servicefollow: StudentService) {
    this.loadCourses()
  }

  ngOnInit(): void {
  }

  loadCourses() {
    this.serviceCourse.getCourses().subscribe(coures => {
      this.courses = coures;
    })
  }

  loadStudentsByCourse(course: string) {
    this.sendCourse();
    this.body.student = '';
    this.servicefollow.getSrudentsBycourse(course).subscribe(students => this.Students = students);
    // this.loadIndicatorsByCourse(course);
  }

  sendBody() {
    if(this.body.student){

      this.selectUser = false;
      this.sendbody.emit(this.body);
      
    }else{
      this.selectUser = true;
    }
  }

  sendCourse() {
    this.body.student = '';
    this.sendcourse.emit(this.body.course);
  }

}
