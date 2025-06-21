import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/Admin/Companies'
import { CompanySetup } from './components/Admin/CompanySetup'
import CompanyCreate from './components/Admin/CompanyCreate'
import PostJob from './components/Admin/PostJob'
import AdminJobs from './components/Admin/AdminJobs'
import Applicants from './components/Admin/Applicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'

function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>   
        <Route path='/login' element={<Login/>}/>   
        <Route path='/jobs' element={<Jobs/>}/>   
        <Route path='/browse' element={<Browse/>}/>   
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/description/:id' element={<JobDescription/>}/>
        <Route path='/admin/companies' element={<Companies/>}/>
        <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
        <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup/></ProtectedRoute>}/>
        <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
        <Route path='/admin/jobs/create' element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>
        <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
