import { TypeError } from "../@types/errorType"
import { TypeDataQuery } from "../@types/typeDataQuery"
import fs from 'fs'

const path = require('path');

// 1 -----------------------------------------------------------------
function PromiseTimer (){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({nome: 'erick'})
        }, 3000)
    })
}


// 2 -----------------------------------------------------------------
function PromiseVerify (query:string|number): Promise<TypeDataQuery | TypeError>{
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            try {
                if(query == "erick"){
                    reject({error: "Entrada invalida"} as TypeError)
                }else if (query = "error"){
                    reject({error: "Error ao fazer consulta"} as TypeError)
                }
                resolve({nome: "erick", dataNascimento: "16-06-2001"});
              } catch (err) {
                reject({ error: "Erro na requisição1" } as TypeError);
              }
        }, 3000)
    })
}

// 3 -----------------------------------------------------------------
async function  allPromise ():Promise<void>{
    const [data1, data2] = await Promise.all([
        PromiseTimer(),
        PromiseVerify(1)
    ])
    console.log(data1, data2)
}

// 4 -----------------------------------------------------------------

async function name() {
  try {
    // Se a promessa for resolvida com sucesso
    const res:TypeDataQuery | TypeError = await PromiseVerify(1)
    if(res!){
        throw Error("erro")
    }
    return res
    
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

// 9 -----------------------------------------------------------------

const sleep = (seconds:number) => {
    return new Promise(resolve => {
      setTimeout(() =>{console.log('funcão dentro do sleep: ', seconds),resolve("oi")}, seconds);
    });
  };
  
  async function exemploAsyncAwait   () {
    await sleep(2000); // Aguarda por 2 seconds sem bloquear a thread principal
    console.log('deve ser executada depois do sleep');
  };



// 10 -----------------------------------------------------------------
function readDir(path:string){
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });
}

async function listDir() {
    try {
        const path = require('path');
        const relatorioPath = path.join(__dirname,'..');
        const files = await readDir(relatorioPath)
        console.log(files)

    } catch (error) {

    }
}

//11 -----------------------------------------------------------------

async function obtersubDir(diretorio: string, item: any): Promise<string[] | null> {
    return new Promise(async (resolve, reject) => {
        try {

            const subdiretorios: any[] = [];

            const relatorioPath = path.join(diretorio, item)
            const status = await fs.promises.stat(relatorioPath)

            if (status?.isDirectory()) {
                const a = await fs.promises.readdir(relatorioPath)
                const b = a.map(async (data: string, index) => {
                    if(index==1){
                        subdiretorios.push({diretorio:item})
                    }
                    const relatorioPath2 = path.join(relatorioPath, data)
                    const stats = await fs.promises.stat(relatorioPath2);

                    if (!stats?.isFile()) {
                        subdiretorios.push(data)
                    }
                })
                await Promise.all(b)
            } 

            resolve(subdiretorios)
        } catch (error) {
            reject(null)
        }
    })
}


const obterSubdiretorios = (diretorio:string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await fs.promises.readdir(diretorio);

            const a = await Promise.all(data.map( (item) => {
                return  obtersubDir(diretorio, item)
            }))
            const b = a.filter((item)=>item ?item?.length>0:null)
            resolve(b)

          } catch (error:any) {
            
          }
    })
  };

async function SubDir (){
    const path = require('path');
    const relatorioPath = path.join(__dirname,'..');
    const a = await obterSubdiretorios(relatorioPath)
    console.log("diretórios e seus sub diretórios: ")
    console.log(a)
}

//exports -----------------------------------------------------------------

export {exemploAsyncAwait, listDir, SubDir}