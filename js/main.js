//Модули нужны чтобы разбить большой проект на мелкие части для разделения архитектуры и удобства
// Доступ к внутренностям модуля есть только у самого модуля, до тех пор, пока эти внутренности явно не экспортируются

import NotesAPI from './NotesAPI.js';      //Получаем доступ к данным модуля API

// NotesAPI.saveNote ({
//     id: 964343,
//     title: "Change note!",
//     body: "I am not a new note"

// });

NotesAPI.daleteNote(964343);

console.log(NotesAPI.getAllNotes());



