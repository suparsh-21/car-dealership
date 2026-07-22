import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()

    // if not logged in, redirect to login page
    if(!user){
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute