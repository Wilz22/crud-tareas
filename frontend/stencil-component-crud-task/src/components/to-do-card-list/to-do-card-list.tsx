import { Component, ComponentInterface, h, State, Listen } from '@stencil/core';
import { CardDataI } from '../../interfaces/card.interface';
import { TaskService } from '../../services/task-service';

interface TaskI {
    title: string;
    description: string;
}

@Component({
    tag: 'to-do-card-list',
    styleUrl: 'to-do-card-list.css',
    shadow: false,
})
export class ToDoCardList implements ComponentInterface {

    constructor() { }

    @State() tasks: Array<CardDataI> = [];
    @State() task: TaskI = { title: '', description: '' };
    @State() messageError: string = "";
    @State() loading: boolean = true;
    @State() editingTaskId: string | null = null; // To track the task being edited

    async componentDidLoad() {
        await this.loadTasks();
    }
//trae las tareas mediante la clase TaskService
    async loadTasks() {
      this.loading = true; // Asegúrate de que se establezca a true al iniciar la carga
      try {
          const tasks = await TaskService.getAllTasks();
          console.log('Tasks from API:', tasks);
          this.tasks = tasks.map((task: any) => ({
              id: task.id,
              title: task.titulo,
              description: task.descripcion
          }));
          console.log('Transformed tasks:', this.tasks);
      } catch (error) {
          console.error('Error loading tasks:', error);
      } finally {
          this.loading = false; // Asegúrate de que se establezca a false al finalizar
      }
  }


//llama un evento listen y llama a la funcion de update
  @Listen('updateTodoTask', { capture: true })
  async updateValue(event: CustomEvent<CardDataI>) {
      let updatedTask: CardDataI = event.detail;
      try {
          await TaskService.updateTask(updatedTask.id, {
              title: updatedTask.title,
              description: updatedTask.description
          });
          console.log('Task updated successfully, reloading tasks...');
          await this.loadTasks();
          console.log('Tasks reloaded successfully.');
      } catch (error) {
          console.error('Error updating task:', error);
      }
  }
//llama un evento listen y llama a la funcion de delete
  @Listen('removeTodoTask', { capture: true })
    async onRemoveToDoHandler(event: CustomEvent<CardDataI>) {
        try {
            await TaskService.deleteTask(event.detail.id);
            await this.loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    onInputChangeHandler = (event: any) => {
        this.task = {
            ...this.task,
            [event.target.name]: event.target.value
        };
    }

    async onButtonClickHandler() {
        if (this.task.title !== "" && this.task.description !== "") {
            try {
                if (this.editingTaskId) {
                    // Update the task
                    await TaskService.updateTask(this.editingTaskId, {
                        title: this.task.title,
                        description: this.task.description
                    });
                    this.editingTaskId = null; // Reset the editing state
                } else {
                    // Create a new task
                    await TaskService.createTask({
                        title: this.task.title,
                        description: this.task.description
                    });
                }

                await this.loadTasks();
                this.task = {
                    title: '',
                    description: ''
                };
                this.messageError = "";
            } catch (error) {
                console.error('Error creating/updating task:', error);
            }
            return;
        }

        this.messageError = "Por favor, complete todos los campos";
    }

    onEditButtonClick(cardData: CardDataI) {
        this.task = {
            title: cardData.title,
            description: cardData.description
        };
        this.editingTaskId = cardData.id; // Set the ID to indicate that we are editing
    }

    render() {
        return (
            <div class="container pt-4">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card card-body">
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Task"
                                    value={this.task.title}
                                    name="title"
                                    onInput={(e) => this.onInputChangeHandler(e)}
                                />
                            </div>

                            <div class="form-group">
                                <textarea
                                    name="description"
                                    rows={3}
                                    placeholder='Description'
                                    class={'form-control'}
                                    value={this.task.description}
                                    onInput={(e) => this.onInputChangeHandler(e)}
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={() => this.onButtonClickHandler()}
                            >
                                {this.editingTaskId ? 'Update Task' : 'Add Task'}
                            </button>
                        </div>

                        {this.messageError && <div class="pt-3">
                            <div class="alert alert-danger" role="alert">
                                {this.messageError}
                            </div>
                        </div>}
                    </div>
                    <div class="col-lg-8">
                        {this.loading ? (
                            <p>Loading...</p>
                        ) : (
                            this.tasks.length > 0 ? this.tasks.map(cardData => {
                                return (
                                  <div key={cardData.id}>
                                      <to-do-cards cardData={cardData}></to-do-cards>
                                      <button class="btn btn-primary btn-center" onClick={() => this.onEditButtonClick(cardData)}>Editar</button>
                                  </div>
                                );
                            }) : "No Card Available !!"
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
