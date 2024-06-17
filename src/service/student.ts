import Student from "../models/student";
import studentRepo from "../repository/student";
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

    public async getStudents(): Promise<Student[]> {
        try {
            return studentRepo.getStudents();
        } catch (err) {
            logger.error("Failed to execute StudentService -> getStudents");
            return [] as Student[];
        }
    }
}

export default StudentService.getInstance();
