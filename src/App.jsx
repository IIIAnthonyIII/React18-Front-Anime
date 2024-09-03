import './App.css'
import Login from './views/login/Login';
import RouterApp from './routes/RouterApp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  // const { isModalVisible, handleOk } = useTokenExpiration();
  return (
    <div>
      <Routes>
        <Route path="/*" element={
          <ProtectedRoutes>
            <RouterApp />
          </ProtectedRoutes>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Modal centered
        title="Su sesión expiró"
        open={isModalVisible}
        onCancel={handleOk}
        onOk={handleOk}
        maskClosable={false}
      > */}
        {/* <Button style={{background: '#4096FF', color:'white'}} onClick={handleOk}>
          Aceptar
        </Button> */}
      {/* </Modal> */}
    </div>
  );
}

export default App;