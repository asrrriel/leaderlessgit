import { spawn } from 'child_process';
import fs from 'fs/promises';

export default {
    init: async function(path) {
        try {
            await fs.access(path);
        } catch(err) {
            console.log("Creating directory: " + path);
            await fs.mkdir(path);
        }
        try {
            await fs.access(path + "/.git");
        } catch(err) {
            console.log("Initializing git in: " + path);
            const git = spawn('git', ['init', path]);
            git.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            git.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            git.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        }
    }
}