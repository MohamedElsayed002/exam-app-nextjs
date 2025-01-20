import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { DropdownMenuCheckboxes } from "./dropdown"
import { Input } from "./ui/input"

const AdminAddQuestion = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-blue-500">Add Question</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Add New Question</h1>
                    </div>
                    <div className="mr-5">
                        <DropdownMenuCheckboxes />
                    </div>
                    </div>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <h1>Add Question</h1>
                            <Input />
                        </div>
                        <div>
                            <h1>Add Answer 1</h1>
                            <Input/>
                        </div>
                        <div>
                            <h1>Add Answer 2</h1>
                            <Input/>
                        </div>
                        <div>
                            <h1>Add Answer 3</h1>
                            <Input/>
                        </div>
                        <div>
                            <h1>Add Answer 4</h1>
                            <Input/>
                        </div>
                    </div>
                    <div className="flex mt-4 gap-2 justify-between">
                        <Button className="mr-5 w-full" variant="secondary">
                            Cancel
                        </Button>
                        <Button className="bg-blue-500 w-full">Add Another Question</Button>
                        <Button className="bg-blue-500 w-full">Save</Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default AdminAddQuestion