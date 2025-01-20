import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import AdminAddQuestion from "./add-question";


const ModalAddExam = () => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600">Add Quiz</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Diploma</DialogTitle>
                </DialogHeader>
                <DialogDescription className="mt-5">
                    <div className="flex items-center gap-5 justify-between">
                        <div className="text-center">
                            <h1>Add Photo</h1>
                            <p className="border border-gray-300 p-2 rounded-full cursor-pointer">+</p>
                        </div>
                        <div>
                            <h1>Time</h1>
                            <Input className="" type='number' />
                        </div>
                        <div>
                            <h1>Question Exam</h1>
                            <Input className="" />
                        </div>
                        <div>
                            <h1>Description</h1>
                            <Input className="" />
                        </div>
                    </div>
                    <div className="flex items-center w-full mt-2 justify-between gap-5">
                        <div>
                            <Button variant="ghost" className="w-full">Back</Button>
                        </div>
                        <div>
                            <AdminAddQuestion/>
                        </div>
                        <div>
                            <Button className="bg-blue-500">ADD</Button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddExam;