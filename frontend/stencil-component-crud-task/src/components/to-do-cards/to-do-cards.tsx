import { Component, ComponentInterface, Prop, h, State, Event, EventEmitter } from '@stencil/core';
import { CardDataI } from '../../interfaces/card.interface';

@Component({
    tag: 'to-do-cards',
    styleUrl: 'to-do-cards.css',
    shadow: false,
})
export class ToDoCards implements ComponentInterface {

    @Prop() cardData: CardDataI;

    @State() isEditable = false;
    @State() cardEditValue = '';

    @Event() removeTodoTask: EventEmitter<CardDataI>;
    @Event() updateTodoTask: EventEmitter<CardDataI>;

    toggleEdition = () => {
        this.isEditable = !this.isEditable;
        this.cardEditValue = this.cardData.title;  // Inicializar el valor editado con el título actual
    };

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            this.isEditable = false;
            const updatedTask = { ...this.cardData, titulo: this.cardEditValue };
            this.updateTodoTask.emit(updatedTask);
        }
    };

    removeThisTodo = () => {
        this.removeTodoTask.emit(this.cardData);
    };

    handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        this.cardEditValue = target.value;
    };

    render() {
        return (
            <div class="column">
                <div class="card">
                    <div class="card-title" onDblClick={this.toggleEdition}>
                        {this.isEditable ? (
                            <input
                                type="text"
                                value={this.cardEditValue}
                                onInput={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                                onBlur={() => this.isEditable = false}
                            />
                        ) : (
                            <div class="card-title-txt">
                                {this.cardData.title}
                            </div>
                        )}
                        <div>
                            <button type="button" class="btn btn-danger btn-sm" onClick={this.removeThisTodo}>
                                X
                            </button>
                        </div>
                    </div>
                    <div>{this.cardData.description}</div>
                </div>
            </div>
        );
    }
}
