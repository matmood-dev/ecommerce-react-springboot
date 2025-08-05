import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
} from 'class-validator';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Column({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Column()
  @IsNotEmpty({ message: 'Username is required' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message:
      'Username can only contain letters, numbers, and underscores',
  })
  username!: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @Column()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;
}
