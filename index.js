// console.log(process.argv);
import inquirer from 'inquirer';
import * as fs from 'node:fs';
import {Command} from 'commander';
const program = new Command();

const question = [ 
  {
    type:'input',
    name:'title',
    message:'What Is title language programing to you'
  },
  {
    type:'number',
    name:'price',
    message:'And What Is price'
  }
];

const filePath = './courses.json';

program
  .name('mostafa-course-manger')
  .description('CLI to make courses in plan')
  .version('1.0.0');


  program
  .command('add')
  .alias('a')
  .description('Added A Course To Mostafa')
  .action(() => {
    inquirer
    .prompt(question)
    .then((answers) => {
      console.log(answers);
      if(fs.existsSync(filePath)){
        fs.readFile(filePath , 'utf8' , (err , fileContent) => {
          const fileContentJson = JSON.parse(fileContent);
          fileContentJson.push(answers);
          fs.writeFile(filePath , JSON.stringify(fileContentJson), 'utf8' , () => {
            console.log("Add Course Done");
          })
        })
      }else{
        fs.writeFile(filePath , JSON.stringify([answers]), 'utf8' , () => {
          console.log("Add Course Done");
        })
      }
    })
  });




// To List The File

program
  .command('list')
  .alias('l')
  .description('Show All Course From Mostafa')
  .action(() => {
    fs.readFile(filePath,'utf8' , (err , content) => {
      console.table(JSON.parse(content));
    });
  })




  program.parse(process.argv);





