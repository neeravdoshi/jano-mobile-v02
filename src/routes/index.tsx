import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/templates/AppLayout'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { PatientsPage } from '@/pages/PatientsPage'
import { PatientsV2Page } from '@/pages/PatientsV2Page'
import { SchedulePage } from '@/pages/SchedulePage'
import { ChatPage } from '@/pages/ChatPage'
import { ChatThreadPage } from '@/pages/ChatThreadPage'
import { LoginPage } from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      // Version 1 (default) = distilled list (PatientsV2Page); Version 2 = classic boxed cards (PatientsPage).
      // The toggle pill in AppLayout swaps between /patients and /patients-v2.
      { path: 'patients', element: <PatientsV2Page /> },
      { path: 'patients-v2', element: <PatientsPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'chat/:id', element: <ChatThreadPage /> },
    ],
  },
  {
    // Design system lives outside the app shell — full-page layout
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
