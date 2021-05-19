
// импорт модулей fs и path 
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require("uuid");

// •	Создай переменную contactsPath и запиши в нее путь к файле contacts.json. 
const contactsPath = path.join(__dirname, "db", "contacts.json") ;

// •	Добавь функции для работы с коллекцией контактов.
// // В функциях используй модуль fs и его методы readFile() и writeFile()

// список контактов
function listContacts() {
    fs.readFile(contactsPath, (error, data) => {
        if (error) {
            throw Error(error);
        }
            console.table(JSON.parse(data));
            });
    }
// получить контакт по идентификатору 
function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
      if (error) throw error;
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (item) => String(item.id) === String(contactId)
    );
    if (!contact) console.log("Такой контакт не найден.!");
    console.table(contact);
  });
}
// удалить контакт
function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const refreshContacts = contacts.filter(
      (item) => String(item.id) !== String(contactId)
    );
    if (refreshContacts.length !== contacts.length) {
      writeNewArr(contactsPath, refreshContacts);
      console.log("Контакт ${contactId} удалили");
    } else {
      console.log("Такой контакт не найден.");
      return;
    }
    console.table(refreshContacts);
  });
}

// добавить контакт 
function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    writeNewArr(contactsPath, newContacts);
    console.table(newContacts);
  });
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};