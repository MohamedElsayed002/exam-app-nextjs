'use client'
import { Button } from "@/components/ui/button"
import { getQuestionsBySubject } from "@/lib/actions/action"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export const ButtonSubmit = ({ id }: { id: string }) => {
    const [data, setData] = useState<Questions[]>([])
    const [isExamStarted, setIsExamStarted] = useState(false)
    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({})
    const [examFinished, setExamFinished] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)
    const [showResults, setShowResults] = useState(false)

    const handleStartExam = async () => {
        try {
            const exams: QuestionResponse = await getQuestionsBySubject(id)
            setData(exams.questions || [])
            setIsExamStarted(true)
            setQuestionNumber(0)
        } catch (error) {
            console.error("Failed to fetch questions:", error)
        }
    }

    const handleNext = () => {
        if (!selectedAnswers[questionNumber]) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }

        if (questionNumber < data.length - 1) {
            setQuestionNumber(questionNumber + 1);
        }
    }

    const handleBack = () => {
        if (questionNumber > 0) {
            setQuestionNumber(questionNumber - 1)
        }
    }

    const handleFinish = () => {
        setExamFinished(true)
        calculateCorrectAnswers()
    }

    const calculateCorrectAnswers = () => {
        let correctCount = 0;
        data.forEach((question, index) => {
            if (selectedAnswers[index] === question.correct) {
                correctCount++;
            }
        });
        setCorrectAnswers(correctCount)
    }

    const handleCheckboxChange = (questionIndex: number, answerKey: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answerKey,
        }))
    }

    const handleShowResults = () => {
        setShowResults(true);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => {
                        setIsExamStarted(false)
                        setData([]) // Reset the questions when starting over
                        setQuestionNumber(0)
                        setExamFinished(false)
                        setCorrectAnswers(0) // Reset correct answers when starting over
                    }}
                    className="bg-blue-500"
                >
                    Start
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {!isExamStarted ? (
                        // Instruction Phase
                        <>
                            <DialogTitle>Exam Instructions</DialogTitle>
                            <DialogDescription>
                                Please read the instructions carefully:
                                <ul className="list-disc ml-5 mt-2 space-y-1">
                                    <li>Make sure you have a stable internet connection.</li>
                                    <li>Answer all questions to the best of your ability.</li>
                                    <li>Click Next to move to the next question.</li>
                                </ul>
                            </DialogDescription>
                            <Button
                                onClick={handleStartExam}
                                className="mt-4 bg-blue-600 rounded-md"
                            >
                                Start Exam
                            </Button>
                        </>
                    ) : examFinished ? (
                        // Result Phase: Show result after finishing the exam
                        <>
                            <DialogTitle>Exam Finished</DialogTitle>
                            <DialogDescription>
                                Thank you for completing the exam. Heres your result:
                                <div className="mt-4">
                                    <p>You answered {correctAnswers} out of {data.length} questions correctly.</p>
                                    <Button
                                        onClick={handleShowResults}
                                        className="mt-4 bg-yellow-500"
                                    >
                                        Show Results
                                    </Button>
                                </div>
                            </DialogDescription>

                            {/* Show detailed results if the user clicks "Show Results" */}
                            {showResults && (
                                <div className="mt-4 overflow-hidden overflow-y-visible max-h-[400px]">
                                    <h3 className="font-bold">Detailed Results</h3>
                                    {data.map((question, index) => (
                                        <div key={index} className="mt-2">
                                            <p><strong>Question {index + 1}:</strong> {question.question}</p>
                                            <p><strong>Your answer:</strong> {selectedAnswers[index]}</p>
                                            <p>
                                                <strong>Correct answer:</strong> {question.correct}
                                            </p>
                                            <p className={selectedAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}>
                                                {selectedAnswers[index] === question.correct ? 'Correct' : 'Incorrect'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        // Exam Phase: Show Questions and Answers
                        <>
                            <DialogTitle>
                                Question {questionNumber + 1}/{data.length}
                            </DialogTitle>
                            <DialogDescription>
                                {data[questionNumber]?.question || "No Questions Available"}
                            </DialogDescription>
                            <ul className="mt-4 ml-5 space-y-2 list-none">
                                {data[questionNumber]?.answers?.length > 0 ? (
                                    data[questionNumber].answers.map((item) => (
                                        <li className="flex items-center gap-5" key={item.key}>
                                            {/* Controlled Checkbox */}
                                            <Checkbox
                                                id={item.answer}
                                                checked={selectedAnswers[questionNumber] === item.key}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        handleCheckboxChange(questionNumber, item.key) // Select only this answer
                                                    } else {
                                                        setSelectedAnswers((prev) => ({ ...prev, [questionNumber]: null })) // Deselect the answer
                                                    }
                                                }}
                                            />
                                            {item.answer}
                                        </li>
                                    ))
                                ) : (
                                    <p>No answers available for this question.</p>
                                )}
                            </ul>

                            <div className="flex gap-5 justify-between">
                                <Button
                                    onClick={handleBack}
                                    className={cn("mt-4 w-full")}
                                    variant='outline'
                                    disabled={questionNumber === 0}
                                >
                                    Back
                                </Button>

                                {questionNumber === data.length - 1 ? (
                                    <Button
                                        onClick={handleFinish}
                                        className="mt-4 bg-green-600 hover:bg-green-400 w-full"
                                    >
                                        Finish
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        className="mt-4 bg-blue-600 hover:bg-blue-400 w-full"
                                        disabled={questionNumber >= data.length - 1}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
