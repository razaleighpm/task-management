import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatChipsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      data => this.tasks = data,
      error => console.error('Error fetching tasks:', error)
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => this.loadTasks(),
      error => console.error('Error deleting task:', error)
    );
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe(
      () => {
        this.loadTasks(); // Reload tasks after completion
      },
      error => console.error('Error completing task:', error)
    );
  }

  editTask(id: number) {
    this.router.navigate(['/edit', id]);
  }
}