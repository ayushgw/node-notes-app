const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('Note addded!'))
    }
    else {
        console.log(chalk.red('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const index = notes.findIndex((notes) => notes.title === title)

    if (index > -1) {
        console.log('Removing note with title: ' + title);
        notes.splice(index, 1)
        saveNotes(notes)
        console.log(chalk.green('Note removed!'));
    } else {
        console.log(chalk.red('Note not found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    
    console.log(chalk.blue('Your notes...'))

    notes.forEach(note => {
        console.log(chalk.cyan(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find(note => note.title === title)

    if(!note) {
        console.log(chalk.red.inverse('Note not found!'));
    }
    else {
        console.log(chalk.blue(note.title));
        console.log(note.body);
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}