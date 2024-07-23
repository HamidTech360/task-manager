import { Controller, Next, Post, Res, HttpStatus, HttpException, Body, ValidationPipe, Get, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService:TaskService
    ){}
    @Post('/')
    async createTask (@Res() res, @Body() createTaskDto:CreateTaskDto , @Next() next){
        try {
            this.taskService.createTask({
                name: createTaskDto.name,
                description:createTaskDto.description,
                status:createTaskDto.status,
                priority:createTaskDto.priority
            })
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message:'Task created successfully'
            })
        } catch (error) {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
            // next(error)
        }
    }

    @Get('/')
    async getAllTasks  (@Res() res, @Next() next){
        try {
            const tasks = await this.taskService.getAllTask()
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:tasks
            })
        } catch (error) {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/:id')
    async getSingleTask  (@Res() res, @Param('id') taskId, @Next() next){
        try {
            const task = await this.taskService.getSingleTask(taskId)
            if(!task) throw new HttpException("Cannot find Task", HttpStatus.NOT_FOUND);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:task
            })
        } catch (error) {
            throw new HttpException("Cannot fetch Task", HttpStatus.NOT_FOUND);
        }
    }

    @Patch('/:id')
    async updateTask (@Res() res, @Param('id') taskId:any , @Body(new ValidationPipe()) body:UpdateTaskDto ,@Next() next){
        try {
            const updateTask = await this.taskService.editTask(taskId, body)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: updateTask,
              });
        } catch (error) {
            throw new HttpException("Cannot update Task", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/:id')
    async deleteTask (@Res() res, @Param('id') taskId, @Next() next){
        try {
            await this.taskService.deleteTask(taskId)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message:'Task Deleted Succesfully'
              });
        } catch (error) {
            throw new HttpException("Failed to Delete Task", HttpStatus.NOT_FOUND);
        }
    }
    
    
}
