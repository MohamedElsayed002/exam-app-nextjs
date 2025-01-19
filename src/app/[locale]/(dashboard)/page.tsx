import Header from "@/components/header"
import Subjects from "@/components/Subjects"
import UserInfo from "@/components/UserInfo"


const HomePage =  async () => {


  return (
    <div className="w-full">
      <Header/>
      <UserInfo/>
      <Subjects/>
    </div>
  )
}

export default HomePage