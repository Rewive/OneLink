import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dto';
import { UpdateCourseDto } from '../dto';
import { Course } from '../entities';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  async findAll() {
    return this.coursesRepository.find();
  }

  async findOne(id: number) {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.coursesRepository.update(id, updateCourseDto);
    const updatedCourse = await this.coursesRepository.findOne({
      where: { id },
    });
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async remove(id: number): Promise<{ status: number; message: string }> {
    const result = await this.coursesRepository.delete(id);
    if (result.affected === 0) {
      return {
        status: 404,
        message: `Course with ID ${id} not found`,
      };
    }
    return {
      status: 200,
      message: `Course with ID ${id} successfully deleted`,
    };
  }
}
