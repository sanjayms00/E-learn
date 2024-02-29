import { Body, Controller, Get, Param, Post, Query, RawBodyRequest, Req, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { studentJwtAuthGuard } from 'src/student/guards/student.guard';
import { StudentCourseService } from 'src/student/services/student-course.service';

@Controller('')
export class StudentCourseController {

    private endpointSecret: any

    constructor(
        private studentCourseService: StudentCourseService,
        private configService: ConfigService
    ) {
        this.endpointSecret = this.configService.getOrThrow('END_POINT_SECRET')
    }

    @Get('home')
    async home() {
        return await this.studentCourseService.home()
    }

    @Get('all-courses')
    async getAllCourse() {
        return await this.studentCourseService.getAllCourse()
    }

    @Get('search/:searchText')
    async searchCourse(@Param('searchText') searchText) {
        return await this.studentCourseService.searchCourse(searchText)
    }

    @Get('course-details/:id')
    async courseDetails(@Param('id') courseId: string) {
        const courseData =  await this.studentCourseService.courseDetails(courseId)
        console.log(courseData)
        return courseData
    }

    @Get('instructors')
    async getInstructors() {
        return await this.studentCourseService.getInstructors()
    }

    @Get('categories')
    async getcategories() {
        return await this.studentCourseService.getCategories()
    }

    @Get('filter')
    async filterCourse(
        @Query('level') level?: string,
        @Query('instructor') instructor?: number,
        @Query('category') category?: number,
    ) {
        const filterCredentials = {
            level,
            instructor,
            category,
        };

        return await this.studentCourseService.getFilteredCourses(filterCredentials)

    }

    @UseGuards(studentJwtAuthGuard)
    @Post('checkout')
    async checkout(@Body() courseData, @Request() req) {
        return await this.studentCourseService.checkout(courseData, req.user._id)
    }

    @Post('webhook')
    async webhookStripe(@Req() req: RawBodyRequest<Request>) {
        const raw = req.rawBody;
        console.log("web hook")
        try {
            if (this.endpointSecret) {
                const eventData = JSON.parse(raw.toString());
                if (eventData.type === 'checkout.session.completed') {
                    const paymentIntentId = eventData.data.object.payment_intent;
                    const studentId = JSON.parse(eventData.data.object.metadata.studentId);
                    const courseId = eventData.data.object.metadata.courseId;

                    // console.log(eventData.data.object.metadata)
                    console.log(`Payment succeeded. PaymentIntent ID: ${paymentIntentId}`, studentId, courseId);
                    return await this.studentCourseService.paymentSuccessService(paymentIntentId, studentId, courseId)
                }
            }
        } catch (error) {
            console.error('Error parsing webhook event:', error.message);
        }
    }



}
