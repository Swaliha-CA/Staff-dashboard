import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import OrdersPage from "@/pages/Orders";
import HistoryPage from "@/pages/History";
import ProfilePage from "@/pages/Profile";
import ScannerPage from "@/pages/Scanner";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/scanner" element={<ScannerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/settings" element={<ProfilePage />} />
      <Route path="/dashboard" element={<Navigate to="/orders" replace />} />
      <Route path="/profile" element={<Navigate to="/settings" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
