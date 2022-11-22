import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/shared/confing/config';
import { HttpService } from 'src/app/shared/services/http.service';
import { Task } from './interfaces/task.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.http.get(Config.todoList).subscribe((list) => {
      this.tasks = list;
    });
  }

  addNewTask() {
    this.tasks.push({
      title: '',
      isFinish: false,
      isNew: true,
    });
  }

  editTask(task: Task) {
    task.isNew = true;
  }

  deleteTask(taskItem: Task) {
    this.http
      .delete(`${Config.todoList}/${taskItem.id}`, taskItem)
      .subscribe((task) => {
        this.tasks.splice(this.tasks.indexOf(taskItem), 1);
      });
  }

  save(task: Task) {
    if (!!task.id) return this.updateTask(task);
    this.http.post(Config.todoList, task).subscribe((res) => {
      task.id = res.id;
      task.isNew = false;
    });
  }

  toggleFinish(task: Task) {
    task.isFinish = !task.isFinish;
    this.updateTask(task);
  }

  updateTask(task: Task) {
    delete task.isNew;
    this.http.put(`${Config.todoList}/${task.id}`, task).subscribe();
  }
}
