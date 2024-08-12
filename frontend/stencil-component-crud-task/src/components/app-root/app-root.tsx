import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css',
    shadow: false
})
export class AppRoot {

    render() {
        return (
            <div>
                <aside class={'text-center pt-4'}>
                    <h1>Tareas del hogar</h1>
                </aside>

                <main>
                    {/* importa el compoonente */}
                    <to-do-card-list></to-do-card-list>
                </main>
            </div>
        );
    }

}
