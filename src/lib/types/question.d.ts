

declare type Answers = {
    answer : string,
    key : string
}

declare type Subject = {
    createdAt : Date,
    icon : string,
    name : string,
    _id : string
}

declare type Questions = {
    answers : Answers[],
    correct : string,
    createdAt : Date,
    exam : ExamData,
    question : string,
    subject : Subject,
    type : string,
    _id : string
}

declare type QuestionResponse = {
    message : 'success' | string,
    questions : Questions[]
}