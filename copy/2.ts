import { Component, OnInit } from '@angular/core';
import { Assessment, AssessmentAttempts, AssessmentAttemptsRetrieveRequest, AssessmentRetrieveRequest,} from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-emp-report',
  templateUrl: './emp-report.component.html',
  styleUrls: ['./emp-report.component.css']
})
export class EmpReportComponent implements OnInit {

  loggedInUserDetail: any;
   empData:any;
   assessments:Assessment[]=[];
   assessmentAttempt:AssessmentAttempts[]=[];
  constructor(public appService:AppService,) {}

  ngOnInit(): void {
    this.appService.getLoggedInUserDetail().subscribe((res) => {
      this.loggedInUserDetail = res;
      this.empData=this.loggedInUserDetail?.employee
      console.log("USER DATA",this.loggedInUserDetail?.employee)
      this.getAssessment()
    });  
  }
 ngAfterViewInit(){
  
 }

  //GET ASSESSMENTS DATA OF EMPLOYEE
getAssessment(){
  let farr = new AssessmentRetrieveRequest();
  farr.assessment_type = "learning_assessment";
  farr.emp_id = this.empData?.id
  this.appService.getAssessments(farr).subscribe(data => {
    this.assessments = data['items'];
    console.log("MY Available ASSESSMENT DATA",data)
    this.getAssessmentAttempts();
    })
}
// //GET ATTEMPTED ASSESSMENTS DATA
getAssessmentAttempts(){
  let r=new AssessmentAttemptsRetrieveRequest();
  r.emp_id=this.empData?.id
  this.appService.getAssessmentAttemps(r).subscribe(res=>{
    console.log("My assessment attemp data",res)
    this.assessmentAttempt=res['items']
    console.log(this.assessmentAttempt)
    
  })
}

getActivityAttemptById(id){
  this.appService.getActivityAttemptById(id).subscribe((res)=>{
    console.log("ACTIVTY ATTEMP BY ID",res)
  })
}

}
