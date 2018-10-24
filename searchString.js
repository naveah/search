const fs = require('fs');
const path = require('path');

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                
                if (stat && stat.isDirectory()) {
                    results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};
var files;
filewalker(path.resolve(__dirname), function(err, data){
    if(err){
        throw err;
    }
    files=data;

    var file_string_search = process.argv[2];
if(process.argv.length<=2)
{
    console.log('USEG:node search [EXT] [TEXT]');
}
for(i=2;i<process.argv.length;i++)
{
    string_search=process.argv[i];

    let counter=0
    data.forEach(file=>
        {
            if (file.includes(string_search))
            {
                console.log(file);
                counter++
            }
        })
    if (counter==0){console.log('No file was found')}

}
});

