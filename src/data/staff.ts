import type { Staff } from "@/types";

export const staffMembers: Staff[] = [
  { id: "STF-001", name: "Priya Sharma", role: "Canteen Manager", email: "priya.sharma@college.edu", phone: "+91 98100 12345" },
  { id: "STF-002", name: "Rahul Verma", role: "Counter Staff", email: "rahul.verma@college.edu", phone: "+91 98100 22345" },
  { id: "STF-003", name: "Neha Iyer", role: "Counter Staff", email: "neha.iyer@college.edu", phone: "+91 98100 32345" },
  { id: "STF-004", name: "Suresh Nair", role: "Kitchen Lead", email: "suresh.nair@college.edu", phone: "+91 98100 42345" },
  { id: "STF-005", name: "Anita Rao", role: "Cashier", email: "anita.rao@college.edu", phone: "+91 98100 52345" },
];

export const currentStaff: Staff = staffMembers[0];
