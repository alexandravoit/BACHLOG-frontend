export const SEMESTER_TEMPLATE = [
  { id: 1, name: "Semester 1", courses: [], totalEap: 0 },
  { id: 2, name: "Semester 2", courses: [], totalEap: 0 },
  { id: 3, name: "Semester 3", courses: [], totalEap: 0 },
  { id: 4, name: "Semester 4", courses: [], totalEap: 0 },
  { id: 5, name: "Semester 5", courses: [], totalEap: 0 },
  { id: 6, name: "Semester 6", courses: [], totalEap: 0 }
];

export const getEmptySemesters = () => {
  return SEMESTER_TEMPLATE.map(semester => ({ ...semester }));
};