export default class NotesView {
    // Так мы делаем прототип для последующего размножения
    constructor ( root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <div class="notes__sidebar">
            <button class="notes__add" type="button">Add Note</button>
            <div class="notes__list"></div>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="New note...">
            <textarea class="notes__body"></textarea>
        </div>
        `;

        const btnAddNote = this.root.querySelector('.notes__add');
        const inpTitle = this.root.querySelector('.notes__title');
        const inpBody = this.root.querySelector('.notes__body');

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();       //При клике выполниться вызов view.onNoteAdd()??? Где консоль лог
        });

        // Сохранение при потере фокуса
        [inpTitle,inpBody].forEach(inputField => {      //Перебираем массив
            inputField.addEventListener('blur', () => {     //Когда поле потеряло фокус (не активно)
                const updatedTitle = inpTitle.value.trim();     //Тогда получаем переданное значение в поля и без пробелов 
                const updatedBody = inpBody.value.trim();
                // console.log(updatedTitle)    //Проверка на то что записывается в переменную
                // console.log(updatedBody)
                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);        //Скрываем по умполчанию текст заметки

    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
        <div class = "notes__list-item" data-note-id = "${id}">
            <div class = "notes__small-title">${title}</div>
            <div class = "notes__small-body">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? '...' : ''}
            </div>
            <div class = "notes__small-updated">
                ${updated.toLocaleString(undefined, { dataStyle: 'full', timeStyle: 'short'})}
            </div>
        </div>
        `;  //Возвращаем строку в updated в определенном строчном формате даты, а аргументы этого метода это свойства объекта конкретного метода
        
    }

    //Обновляем
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.notes__list');

        //Очищаем содержимое
        notesListContainer.innerHTML = '';    
        
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));     //Присваиваем аргументы для рендера из объекта локального хранилища

            notesListContainer.insertAdjacentHTML('beforeend', html);
        }

        notesListContainer.querySelectorAll('.notes__list-item').forEach(noteListItem => {
            noteListItem.addEventListener('click', () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener('dblclick', () => {
                const doDelete = confirm('Are you sure you want to delete this note?');

                if(doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }


    //Сразу отображаем заметку на главном экране готовой к редактированию
    updateActiveNote(note) {
        this.root.querySelector('.notes__title').value = note.title;        //Получаем определнную заметку из хранилища и присваиваем для разметки значение которое есть в хранилище для этой разметки
        this.root.querySelector('.notes__body').value = note.body;

        this.root.querySelectorAll('.notes__list-item').forEach(noteListItem => {
            noteListItem.classList.remove('notes__list-item--selected');
        });

        this.root.querySelector(`.notes__list-item[data-note-id = "${note.id}"]`).classList.add('notes__list-item--selected');
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector('.notes__preview').style.visibility = visible ? 'visible' : 'hidden';
    }
}



// 48:20
// Расписать работу приложения
// This отвечает за тот объект в контексте которого было вызвано
// То есть в данном случае this.root = view.app