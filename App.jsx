import { useState } from 'react'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import { Box ,useColorModeValue} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/ui/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path= "/" element= {<HomePage />}  />
        <Route path= "/create" element= {<CreatePage />}  />
        </Routes>
 

    </Box>
    </>
  )
}

export default App
