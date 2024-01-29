export interface courseStudentCount {
    _id: string
    totalStudents: number
}

export interface instructorDashboardInterface {
    courseStudentCount: courseStudentCount[]
}