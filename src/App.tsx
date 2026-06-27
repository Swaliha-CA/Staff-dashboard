import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import OrdersPage from "@/pages/Orders";
import HistoryPage from "@/pages/History";
import ProfilePage from "@/pages/Profile";
import ScannerPage from "@/pages/Scanner";
import VerifyPage from "@/pages/Verify";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/scanner" element={<ScannerPage />} />
      <Route path="/verify/:id" element={<VerifyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
