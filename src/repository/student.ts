import Student from "../models/student";
import studentModel from "../models/student";
import { IStudent } from "../types/student";

class StudentRepo {
    private static instance: StudentRepo;
    private constructor() {}

    public static getInstance() {
        if (!StudentRepo.instance) {
            StudentRepo.instance = new StudentRepo();
        }

        return StudentRepo.instance;
    }

    public async getStudents(): Promise<Student[]> {
        return studentModel.findAll();
    }
}

export default StudentRepo.getInstance();
