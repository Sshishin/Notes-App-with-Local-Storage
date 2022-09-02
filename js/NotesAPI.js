// JSON это формат приобразования в строку и обратно и передачи определенного вида строки 

export default class NotesAPI {     //Используем экспорт по умолчанию
    static getAllNotes() {      //Получаем все заметки  //Используем static когда хотим чтобы метод принадлежал только всему классу, а не копиям, а также static аналогичен NotesAPI.getAllNotes
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");     //Parse декодирует JSON строку обратно в объект. Так мы получаем в константу notes объект из local storage
    
        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;      //Сортируем объект из локал сторейджа в зависимости от такого у кого дата обновления свежее
        });
    }

    static saveNote(noteToSave) {      
        const notes = NotesAPI.getAllNotes();

        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();      //Получаем дату в определенном формате

        notes.push(noteToSave); 
        localStorage.setItem('notesapp-notes', JSON.stringify(notes));      //Здесь мы установили ключ значение notesapp-notes: -1 или 1
    }   

    static daleteNote(id) {      

    }

}

// 13:58