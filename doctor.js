const fs = require('fs');
const Path = require('path');

function walkSync(dir) {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => walkSync(Path.join(dir, f))))
        : dir;
}

const arr = walkSync('src/app');
let errorCount = 0;
arr.map(path => {
    if (path.indexOf('.ts') !== -1 || path.indexOf('.html') !== -1) {
        // console.log(path);
        const content = fs.readFileSync(path);
        if (content.indexOf(".t(") !== -1) {
            // console.log(path);

            /**
             * 번역하는 내용 중에 ${name}) 와 같이 }) 두 문자가 연속으로 붙으면 안된다.
             */
            const pattern = /\.t\(([^}]*}\s*\))/g;
            while ((myArray = pattern.exec(content)) !== null) {
                // const msg = 'Found ' + myArray[1] + '. ';

                let str = myArray[1];

                // console.log('str: ', str);

                let error = false;
                let errorstr = '';
                if ( /[\'\"]?en[\'\"]?\s*:/.test(str) ) {

                } else {
                    error = true;
                    errorstr += "No English Translateion. ";
                }
                
                if ( /[\'\"]?ko[\'\"]?\s*:/.test(str) ) {

                } else {
                    error = true;
                    errorstr += "No Korean Translateion. ";
                }
                
                if ( /[\'\"]?ch[\'\"]?\s*:/.test(str) ) {

                } else {
                    error = true;
                    errorstr += "No Chinese Translateion. ";
                }
                if ( /[\'\"]?jp[\'\"]?\s*:/.test(str) ) {

                } else {
                    error = true;
                    errorstr += "No Japanese Translateion. ";
                }
                
                if ( error ) {
                    console.log(`==> ERROR: ${path}`);
                    console.log(errorstr);
                    console.log(str);
                    errorCount ++;
                }
            }
        }
    }
});
console.log(`Got ${errorCount} errors on language translation`);

