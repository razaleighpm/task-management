import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form-update',
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,],
  templateUrl: './task-form-update.component.html',
  styleUrl: './task-form-update.component.css'
})
export class TaskFormUpdateComponent {
  task = { title: '', description: '', status: '', completed: false };
  statusOptions = ['Open', 'In Progress', 'Closed', 'Completed'];
  errors: any = {};

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadTask(id);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe(
      (data) => {
        this.task = data;
      },
      (error) => {
        console.error('Error fetching task', error);
      }
    );
  }

  updateTask(): void {
    const id = this.route.snapshot.params['id'];
    this.taskService.updateTask(id, this.task).subscribe(
      (response) => {
        console.log('Task updated successfully', response);
        this.snackBar.open('Task updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating task', error);
        this.snackBar.open('Failed to update task!', 'Retry', {
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
