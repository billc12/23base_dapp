import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
// import WarningModal from '../components/Modal/WarningModal'
import ComingSoon from './ComingSoon'
import { ModalProvider } from 'context/ModalContext'
import { routes } from 'constants/routes'
import { ToastContainer } from 'react-toastify'
// import Footer from 'components/Footer'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%'
  // maxHeight: '100vh',
  // overflow: 'auto',
  // alignItems: 'center'
})

const BodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${theme.height.header})`,
  padding: '50px 0 80px',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  // overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: `calc(100vh - ${theme.height.header} - ${theme.height.mobileHeader})`,
    paddingTop: 20
  }
}))

export default function App() {
  return (
    <Suspense fallback={null}>
      <ModalProvider>
        <AppWrapper id="app">
          <ContentWrapper>
            <Header />
            <BodyWrapper id="body">
              <ToastContainer />
              <Popups />
              <Polling />
              {/* <WarningModal /> */}
              <Routes>
                <Route path={routes.test1} element={<ComingSoon />} />
                <Route path={routes.test2} element={<ComingSoon />} />
                <Route path={routes.test3} element={<ComingSoon />}>
                  <Route path={routes.test3 + routes.test3Desc} element={<ComingSoon />} />
                </Route>
                <Route path="*" element={<Navigate to={routes.test1} replace />} />
              </Routes>
            </BodyWrapper>
            {/* <Footer /> */}
          </ContentWrapper>
        </AppWrapper>
      </ModalProvider>{' '}
    </Suspense>
  )
}
