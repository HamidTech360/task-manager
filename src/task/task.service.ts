import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) 
        private TaskModel: Model<Task>
    ) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    const createdTask = new this.TaskModel(task);
    console.log('In task service')
    return await createdTask.save();
  }

  async getAllTask(): Promise<Task[]> {
    console.log('In task service GET')
    return await this.TaskModel.find();
  }

  async editTask (taskId:string, data:UpdateTaskDto): Promise<any>{
    
     return await this.TaskModel.findByIdAndUpdate(taskId, {
        ...(data.name && {name:data.name}),
        ...(data.status && {status:data.status}),
        ...(data.description && {description:data.description}),
        ...(data.priority && {priority:data.priority}),
     }, {new:true})
  }

  async getSingleTask (taskId:string): Promise<Task>{
    return await this.TaskModel.findById(taskId)
  }

  async deleteTask (taskId:string): Promise<Task>{
    return await this.TaskModel.findByIdAndDelete(taskId)
  }


}
