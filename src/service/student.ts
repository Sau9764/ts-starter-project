import Student from "../models/student";
import studentRepo from "../repository/student";
import { IStudent } from "../types/student";
import { logger } from "../utils/helper/logger";

class StudentService {
    private static instace: StudentService;

    private constructor() {}

    public static getInstance() {
        if (!StudentService.instace) {
            StudentService.instace = new StudentService();
        }

        return StudentService.instace;
    }

    public async getStudents(page: number, size: number): Promise<Student[]> {
        try {
            return studentRepo.getStudents({
                offset: page,
                limit: size,
                order: [["id", "ASC"]],
            });
        } catch (err) {
            logger.error("Failed to execute StudentService -> getStudents");
            return [] as Student[];
        }
    }

    public async registerStudent(student: IStudent): Promise<Student> {
        try {
            student.createdAt = new Date();
            student.updatedAt = new Date();

            return studentRepo.create(student);
        } catch (err) {
            logger.error("Failed to execute StudentService -> registerStudent");
            return {} as Student;
        }
    }
}

export default StudentService.getInstance();
