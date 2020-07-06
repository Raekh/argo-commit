var inquirer = require("inquirer")

var commitType = [{
    type: 'list',
    name: 'type',
    message: "What does your commit contain ?",
    choices: [{
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
    confirm
}