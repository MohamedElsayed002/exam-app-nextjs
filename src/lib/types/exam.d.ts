
declare type ExamData = {
    _id : string,
    title : string,
    duration : number,
    subject : string,
    numberOfQuestions : number,
    active : boolean,
    createdAt : Date
}

declare type MetaData = {
    currentPage : number,
    numberOfPages: number,
    limit : number
}


declare type ExamResponse = {
    message : 'success' | 'error'
    metadata : MetaData
    exams : ExamData[]
}