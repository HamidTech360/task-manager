import { IsString, IsEnum, IsNotEmpty } from "class-validator"


export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsEnum(['InProgress', 'Completed', 'ToDo'])
    status:string;

    @IsNotEmpty()
    @IsEnum(['High', 'Low', 'Medium'])
    priority:string;
}