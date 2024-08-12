export class TaskService {
  private static API_URL = 'http://localhost:3000/api/tasks'; // Asegúrate de que esta URL sea la correcta

  static async getAllTasks() {
    const response = await fetch(this.API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }

  static async createTask(task: { title: string; description: string }) {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  }

  static async updateTask(id: string, task: { title: string; description: string }) {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  }

  static async deleteTask(id: string) {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  }
}
