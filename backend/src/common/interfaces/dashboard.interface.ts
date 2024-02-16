export interface InstructorDashboardData {
    totalCount: [{ count: number }];
    otherData: [{
        soldOutCourse: number;
        averageRating: number;
    }];
}