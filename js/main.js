//Модули нужны чтобы разбить большой проект на мелкие части для разделения архитектуры и удобства
// Доступ к внутренностям модуля есть только у самого модуля, до тех пор, пока эти внутренности явно не экспортируются

// import NotesAPI from './NotesAPI.js';      //Получаем доступ к данным модуля API

// // NotesAPI.saveNote ({
// //     id: 964343,
// //     title: "Change note!",
// //     body: "I am not a new note"

// // });

// NotesAPI.daleteNote(964343);

// console.log(NotesAPI.getAllNotes());


// import NotesView from './NotesView.js';
// import NotesAPI from './NotesAPI.js';

import App from "./App.js";

const root = document.getElementById("app");  //Получаем блок по ид
const app = new App(root);   

// // Просто создаем новый обьъект где контекстом вызова будет view, и переданные аргументы равны аргументам view, а в остальном это копия
// const view = new NotesView (app, {      //Создаем копию класса и помещаем в нее наш полученный блок
//     onNoteAdd() {       //Вызываем функцию которая вызовет консоль лог, а клик определен в модуле
//         console.log('Lets add a note!');
//     }, 
//     onNoteSelect(id) {       //Выбираем 
//         console.log('Note selected: ' + id);
//     }, 
//     onNoteDelete(id) {       //Выбираем 
//         console.log('Note DELETED: ' + id);
//     }, 
//     onNoteEdit(newTitle, newBody) {     //Сохраняем написанный текст
//         // console.log('Save and updated');
//         console.log(newTitle);
//         console.log(newBody);
//     }
    
// });

// const notes = NotesAPI.getAllNotes();

// view.updateNoteList(notes);    //Перебираем полученный массив из локального хранилища для обновления и отображения на странице
// view.updateActiveNote(notes[0]);