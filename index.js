var inquirer = require("inquirer")

var choices = [{
    type: 'checkbox',
    name: 'action',
    message: "What do you wish to do ?",
    choices: [
        {
            name:'Commit',
            value:'commit'
        },
        {
            name:'Copy commit message to clipboard',
            value:'copy'
        }
    ],
    validate: function(answer){
        if(answer.length < 1){
            return 'You must choose at least one choice.'
        }
        return true;
    }
}]

var commitType = [{
    type: 'list',
    name: 'type',
    message: "What does your commit contain ?",
    choices: [
        {
            name: '[+] New features',
            value: '+'
        },
        {
            name: '[-] Removed features',
            value: '-'
        },
        {
            name: '[*] Improvements',
            value: '*'
        },
        {
            name: '[~] Bug fixes',
            value: '~'
        }
    ]
}]

var confirmCommit = [{
    type: 'confirm',
    name: 'confirm',
    message: 'Confirm ?',
    default: false
}]

function choice(){
    return new Promise((resolve,reject)=>{
        inquirer
        .prompt(choices)
        .then(choice => {
            resolve(choice.action)
        })
    })
}

function commit() {
    return new Promise((resolve,reject) => {
        inquirer
        .prompt(commitType)
        .then(commitType => {
            resolve(commitType.type)
        })
        // reject("error during commit function")
    })
}

function confirm(){
    return new Promise((resolve,reject)=>{
        inquirer
        .prompt(confirmCommit)
        .then(confirmAnswer => {
            resolve(confirmAnswer.confirm);
        })
        // reject("error during confirmation")
    })
}

module.exports = {
    commit,
    confirm,
    choice
}