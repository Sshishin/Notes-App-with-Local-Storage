// JSON это формат приобразования в строку и обратно и передачи определенного вида строки 

export default class NotesAPI {     //Используем экспорт по умолчанию
    static getAllNotes() {      //Получаем все заметки  //Используем static когда хотим чтобы метод принадлежал только всему классу, а не копиям, а также static аналогичен NotesAPI.getAllNotes
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");     //Parse декодирует JSON строку обратно в объект. Так мы получаем в константу notes объект из local storage
        
        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;      //Сортируем объект из локал сторейджа в зависимости от такого у кого дата обновления свежее
        });
    }

    static saveNote(noteToSave) {          //Здесь в качестве значения получаем объект из main
        const notes = NotesAPI.getAllNotes();   //Здесь получаем отсортированный объект ??? //Сначала получаем имеющийся JSON объект и получаем его в формате объекта, а потом сортируем
        const existing = notes.find(note => note.id == noteToSave.id);    //Проверяем на наличие  //Вернет первый элемент в массиве похдходящий под условия
        //notes это полученный общий массив, а noteToSave это объект который мы хотим добавить
        //В exiting будует хранитья найденный объект общего массива

        //Edit/Update
        
        // Здесь меняем объект общего массива через изменение объекта который мы добавили
        if(existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();

        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();      //Получаем дату в определенном формате
            notes.push(noteToSave);     //Добавляем объект в конец общего массива
        }

        localStorage.setItem('notesapp-notes', JSON.stringify(notes));      //Обновляем ключ-значения?
    }   

    static daleteNote(id) {      
        const notes = NotesAPI.getAllNotes();       //Получаем весь массив данных
        const newNotes = notes.filter(note => note.id != id);       //Если в полученном массиве id элемента не равно id переданному, то это true и остается для следующей версии массива.

        localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
    }

}

// 13:58
// После завершения работы пробежаться по всей программе и понять что она точно работает