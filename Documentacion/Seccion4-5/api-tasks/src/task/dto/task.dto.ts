import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly description: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;
}

// //validamos los datos
// @IsNotEmpty()
//   @IsString()
//   @MinLength(5)
//   @IsBoolean()
