import {Component, OnInit} from '@angular/core';
import {AssessmentActivityAttemptsRetrieveRequest, AssessmentActivityAttempt, AssessmentAttempts, AssessmentAttemptsRetrieveRequest, Activity, ActivityRetrieveRequest, CompetencyRetrieveRequest, Competency, ActivityQuestion, ActivityQuestionsRetrieveRequest} from 'src/app/app.models';
import {AppService} from 'src/app/app.service';
@Component({selector: 'app-emp-report', templateUrl: './emp-report.component.html', styleUrls: ['./emp-report.component.css']})
export class EmpReportComponent implements OnInit {

    loggedInUserDetail : any;
    empData : any;
    assessment_attempt_ids : Array < number > = []
    assessment_ids:Array<number>=[]
    // assessments:Assessment[]=[];
    assessmentAttempt : AssessmentAttempts[] = [];
    assessmentActivityAttempt : AssessmentActivityAttempt[] = []
    activity:Activity[]=[]
    assessment_activity_ids:Array<number>=[]
    assessmentQuestionData:ActivityQuestion[]=[]
    //competencies_ids:Array<number>=[]
    //competenciesData:Competency[]=[]
    question_competencies_ids:Array<number>=[]
    constructor(public appService : AppService,) {}

    ngOnInit(): void {
        this.appService.getLoggedInUserDetail().subscribe((res) => {
            this.loggedInUserDetail = res;
            this.empData = this.loggedInUserDetail ?. employee
            //console.log("USER DATA", this.loggedInUserDetail ?. employee)
            this.getAssessmentAttempts()
        });
    }
    // ngAfterViewInit() {

    // }

    getAssessmentAttempts() {
        let r = new AssessmentAttemptsRetrieveRequest();
        r.emp_id = this.empData ?. id
        this.appService.getAssessmentAttemps(r).subscribe(res => {
            this.assessmentAttempt = res['items']
            console.log("My assessment attemp data",res['items'])
            console.log("My assessment attemp data", this.assessmentAttempt.length)
            for (var i = 0; i < this.assessmentAttempt.length; i++) {
              this.assessment_ids.push(this.assessmentAttempt[i].assessment_id)
              this.assessment_attempt_ids.push(this.assessmentAttempt[i].id)
            //   for(var j=0;j<this.assessmentAttempt[i]['assessment'].competencies.length;j++){
            //       this.competencies_ids.push(this.assessmentAttempt[i]['assessment'].competencies[j])
            //   }
          }
          
       
         
           
            console.log(this.assessment_attempt_ids)
            console.log("ASSESSMENTS IDS",this.assessment_ids)
           // this.getCompetencies()
            this.getAssessmentActivityAttemps()
            this.getActivity()
        })
    }
    //get ASSESSMENT Activity Attemp data
    getAssessmentActivityAttemps() {
        let act = new AssessmentActivityAttemptsRetrieveRequest()
        act.per_page=40
        act.assessment_attempt_ids = this.assessment_attempt_ids
        this.appService.getAssessmentActivityAttemptsByAssessmentAttemptId(act).subscribe((res) => {
            console.log("ASSESSMENT ACTIVITY ATTEMPTS", res)
            this.assessmentActivityAttempt=res['items']
            for (var i = 0; i < this.assessmentActivityAttempt.length; i++) {
                this.assessment_activity_ids.push(this.assessmentActivityAttempt[i].assessment_activity_id)
            }
            console.log("ASSESSMENT ACTIVITY ATTEMPTS LEN",this.assessmentActivityAttempt.length)
            console.log("ASSESSMENT ACTIVITY IDS for get assessment_question_comp",this.assessment_activity_ids)
            this.getActivityQuestion()
        })
    }
    //Get the activity data

    getActivity(){
      let aa=new ActivityRetrieveRequest()
      aa.per_page=40
      aa.assessment_ids=this.assessment_ids
      this.appService.getActivities(aa).subscribe((res)=>{
        this.activity=res['items']
        console.log("MY ACTIVITY DATA",res)
      })
    }
    //get Activty Queestion Data with _question_comp
    getActivityQuestion(){
        let qq=new ActivityQuestionsRetrieveRequest()
        qq.assessment_activity_ids=this.assessment_activity_ids
        this.appService.getActivityQuestionsByActivityId(qq).subscribe((res)=>{
            this.assessmentQuestionData=res['items']
            console.log("Assessment question activty data with question comp",this.assessmentQuestionData)
            for(var i=0;i<this.assessmentQuestionData.length;i++){
                this.question_competencies_ids.push(this.assessmentQuestionData[i]['question_competency_id'])
            }
            console.log("question_competency_id",this.question_competencies_ids)
        })
    }
//     getCompetencies(){
// let cc=new CompetencyRetrieveRequest()
// cc.ids=this.competencies_ids
// this.appService.getCompetencies(cc).subscribe((res)=>{
//     console.log("competencies IDS",this.competencies_ids)
//     console.log("Competencies Data",res)
//     this.competenciesData=res['items']
// })
//     }


}
