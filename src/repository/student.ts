import { FindOptions, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

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

    public async create(
        student: Optional<IStudent, NullishPropertiesOf<IStudent>>
    ): Promise<Student> {
        return studentModel.create(student);
    }

    public async getStudents(query: FindOptions<IStudent>): Promise<Student[]> {
        return studentModel.findAll(query);
    }
}

export default StudentRepo.getInstance();
