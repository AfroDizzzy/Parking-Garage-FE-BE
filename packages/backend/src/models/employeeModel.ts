import { Employee } from "./types";

// In-memory storage (replace with database in production)
let employees: Employee[] = [
  { id: 1, name: "John Smith", email: "john@company.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@company.com" },
  { id: 3, name: "Mike Chen", email: "mike@company.com" },
  { id: 4, name: "Emily Davis", email: "emily@company.com" },
  { id: 5, name: "David Wilson", email: "david@company.com" },
];

export const getEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find((emp) => emp.id === id);
};

export const addEmployee = (employee: Omit<Employee, "id">): Employee => {
  const newEmployee: Employee = {
    id: employees.length + 1,
    ...employee,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (
  id: number,
  updates: Employee
): Employee | null => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updates };
  return employees[index] ?? null;
};

export const removeEmployee = (id: number): Employee | null => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return null;

  return employees.splice(index, 1)[0] ?? null;
};
