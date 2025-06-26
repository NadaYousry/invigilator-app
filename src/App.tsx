import MainLayout from "@layout/main-layout/MainLayout";
import DownloadAssessment from "@pages/download-assessment/DownloadAssessment";
import { Route, Routes } from "react-router-dom";
import TrackExam from "@pages/track-exam/TrackExam";
import "@/App.css";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DownloadAssessment />} />
        <Route path="/track-exam/:id" element={<TrackExam />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
