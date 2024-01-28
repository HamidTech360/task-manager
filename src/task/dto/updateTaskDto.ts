import { IsString, IsEnum, IsNotEmpty } from "class-validator"


export class UpdateTaskDto{
    @IsString()
    name:string;

    @IsString()
    description:string;

    @IsEnum(['InProgress', 'Completed', 'ToDo'])
    status:string;

    @IsEnum(['High', 'Low', 'Medium'])
    priority:string;
}