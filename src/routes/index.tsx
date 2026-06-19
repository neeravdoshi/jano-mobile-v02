import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/templates/AppLayout'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { HomePage } from '@/pages/HomePage'
import { HomeV2Page } from '@/pages/HomeV2Page'
import { PatientsPage } from '@/pages/PatientsPage'
import { PatientsV2Page } from '@/pages/PatientsV2Page'
import { PatientDetailPage } from '@/pages/PatientDetailPage'
import { PatientReportsPage } from '@/pages/PatientReportsPage'
import { PrescriptionsListPage } from '@/pages/PrescriptionsListPage'
import { PrescriptionEditorPage } from '@/pages/PrescriptionEditorPage'
import { PrescriptionUploadPage } from '@/pages/PrescriptionUploadPage'
import { NotesListPage } from '@/pages/NotesListPage'
import { NoteCreatePage } from '@/pages/NoteCreatePage'
import { NoteDetailPage } from '@/pages/NoteDetailPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { ChatPage } from '@/pages/ChatPage'
import { ChatV2Page } from '@/pages/ChatV2Page'
import { ChatThreadPage } from '@/pages/ChatThreadPage'
import { ChatThreadV2Page } from '@/pages/ChatThreadV2Page'
import { AskPage } from '@/pages/AskPage'
import { LoginPage } from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      // Version 1 (default) = agenda / doctor's-day SummaryCard (HomeV2Page);
      // Version 2 = original dialysis-breakdown SummaryCard (HomePage).
      // The toggle pill in AppLayout swaps between /dashboard and /dashboard-v2.
      { path: 'dashboard', element: <HomeV2Page /> },
      { path: 'dashboard-v2', element: <HomePage /> },
      // Version 1 (default) = distilled list (PatientsV2Page); Version 2 = classic boxed cards (PatientsPage).
      // The toggle pill in AppLayout swaps between /patients and /patients-v2.
      { path: 'patients', element: <PatientsV2Page /> },
      { path: 'patients-v2', element: <PatientsPage /> },
      // Patient detail — Ritika's CKD clinical-record timeline. Reached from either list.
      { path: 'patients/:id', element: <PatientDetailPage /> },
      // Pathology reports — parameter trend cards + line charts, reached from the Reports quick-access chip.
      { path: 'patients/:id/reports', element: <PatientReportsPage /> },
      // Prescription flow — list → type / upload / view. Reached from the Prescription quick-access chip.
      { path: 'patients/:id/prescriptions', element: <PrescriptionsListPage /> },
      { path: 'patients/:id/prescriptions/new', element: <PrescriptionEditorPage /> },
      { path: 'patients/:id/prescriptions/upload', element: <PrescriptionUploadPage /> },
      { path: 'patients/:id/prescriptions/:rxId', element: <PrescriptionEditorPage /> },
      // Notes flow — grid → record / type / view + edit. Reached from the Notes quick-access chip.
      { path: 'patients/:id/notes', element: <NotesListPage /> },
      { path: 'patients/:id/notes/new', element: <NoteCreatePage /> },
      { path: 'patients/:id/notes/:noteId', element: <NoteDetailPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      // Chat list: Version 1 (default) = doctor header + floating row cards (ChatPage);
      // Version 2 = WhatsApp-style "Messages" title + full-bleed hairline list (ChatV2Page).
      { path: 'chat', element: <ChatPage /> },
      { path: 'chat-v2', element: <ChatV2Page /> },
      { path: 'chat/:id', element: <ChatThreadPage /> },
      { path: 'chat/:id/v2', element: <ChatThreadV2Page /> },
      // Ask AI — agent entry point. `?from=home|reports` picks the suggestions + script.
      { path: 'ask', element: <AskPage /> },
    ],
  },
  {
    // Design system lives outside the app shell — full-page layout
    path: '/design-system',
    element: <DesignSystemPage />,
  },
])
