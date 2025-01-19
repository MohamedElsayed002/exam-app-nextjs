import Header from "@/components/header";
import { getExamBySubject } from "@/lib/actions/action";
import { ButtonSubmit } from "./ButtonExam";


const SingleExam = async ({ params: { id } }: { params: { id: string } }) => {

    if (!id) {
        return <h1>No Id Provided</h1>
    }
    const data: ExamResponse = await getExamBySubject(id)

    if(data.exams.length === 0) {
        return <h1>No Data Found</h1>
    }



    return (
        <>
            <Header />
            <div className="mt-10">
                {data.exams.map((item) => {
                    return (
                        <div key={item._id} className="bg-gray-300 w-4/5 mx-auto flex justify-between items-center p-3 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-1">
                            <div className="flex gap-3">
                                <h1 className="bg-blue-500 text-white rounded-xl p-3">
                                    {item.title.charAt(0).toUpperCase()}
                                </h1>
                                <div>
                                <h2>{item.title}</h2>
                                <h3>{item.numberOfQuestions} Questions</h3>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <h1>{item.duration}</h1>
                                <ButtonSubmit id={item._id} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SingleExam;