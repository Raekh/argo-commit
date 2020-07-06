#!/usr/bin/env node

const {commit,confirm} = require('./index');
const { exec } = require('child_process')

var message = process.argv[2];
if(message === undefined){
    console.log("ERROR: commit message empty");
    exit(1);
}

exec("git rev-parse --is-inside-work-tree 2>/dev/null", (error, stdout, stderr)=>{
    if(error){
        console.log("ERROR: not a git repository")
        return;
    }
    if(stderr){
        console.log(`stderr: ${stderr}`);  
        return;
    }
    exec("git symbolic-ref --short HEAD | tr '\n' ' '", (error, stdout, stderr) => {
        if(error){
            console.log(error);
            
            return error;
        }
        if(stderr){
            console.log(stderr)
            return stderr;
        }
        commit().then(type => {
            var branchName = stdout;
            var commitMessage = `[${type}] ${branchName}- ${message}`
            console.log(`%cmessage : %c"${commitMessage}"`,"font-weight:bold","font-weight:regular")
            confirm().then(response => {
                if(response == true){
                    exec (`git commit -m '${commitMessage}'`, (error,stdout,stderr) => {
                        if(error){
                            console.log(error);
                            return;
                        }
                        if(stderr){
                            console.log(stderr)
                            return;
                        }
                        if(stdout){
                            console.log(stdout);
                            return;
                        }
                    })
                }
            });
        });
    })
})



