import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = { title: '', description: '', status: '' };
  statusOptions = ['Open', 'In Progress', 'Closed'];
  errors: any = {};

  constructor(private taskService: TaskService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit(): void {
    this.taskService.createTask(this.task).subscribe(
      response => {
        console.log('Task created successfully', response);
        this.task = { title: '', description: '', status: '' };
        this.snackBar.open('Task created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error creating task:', error);
        this.snackBar.open('Error creating task!', 'Retry', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        if (error.error) {
          this.errors = error.error.reduce((acc: any, curr: any) => {
            acc[curr.field] = curr.defaultMessage;
            return acc;
          }, {});
        }
      }
    );
  }
}