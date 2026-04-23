
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
     <ToastContainer 
            position="top-right"
            autoClose={3000}   
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
     <AppRoutes/>
     </>
  )
}

export default App
