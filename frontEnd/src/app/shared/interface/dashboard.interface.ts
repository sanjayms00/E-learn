export interface courseStudentCount {
    _id?: null
    totalCourses: number
    totalStudents: number
}

export interface instructorDashboardInterface {
    courseStudentCount: courseStudentCount[]
}