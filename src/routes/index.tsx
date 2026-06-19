import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/templates/AppLayout'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { PatientsPage } from '@/pages/PatientsPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { ChatPage } from '@/pages/ChatPage'
import { LoginPage } from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'patients', element: <PatientsPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'chat', element: <ChatPage /> },
    ],
  },
  {
    // Design system lives outside the app shell — full-page layout
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
