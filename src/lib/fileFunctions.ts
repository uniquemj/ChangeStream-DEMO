import fs, { mkdir } from 'fs/promises'
import path, { dirname } from 'path'

export const storage = path.join(process.cwd(), 'data', 'data.json')

export const fileExists = async(path: string, content = []) => {
    try{
        await fs.access(path);
        return true
    }catch(e){
        try{
            const dir = dirname(path);
            await mkdir(dir, {recursive: true})
            await writeFileHelper(content)
        }catch(e){
            console.log('Error creating file.')
        }
    }
}

export const readFileHelper = async(): Promise<Tasks[]> =>{
    const data = await fs.readFile(storage, 'utf-8')
    return JSON.parse(data)
}

export const writeFileHelper = async(content: Tasks | Tasks[]) =>{
    await fs.writeFile(storage, JSON.stringify(content))
}


export const insert = async(content: Tasks) =>{
    try{
        console.log("Inserting data to file . . . ")
        await fileExists(storage)
        const tasks = await readFileHelper()
        tasks.push(content)
        await writeFileHelper(tasks)
    } catch (e){
        console.log('Error: ',e)
        await writeFileHelper([content])
    }
}


export const update = async(id: string, args: Partial<Tasks>) =>{
    try{
        console.log("Updateing data in file . . .")
        await fileExists(storage)
        const {title, status, description, due_date, created_at} = args
        const tasks = await readFileHelper()
        const taskIndex = tasks.findIndex((t:Tasks) => t._id == id)

        
        const taskDetail: Partial<Tasks> = {
            title: title || tasks[taskIndex].title,
            status: status || tasks[taskIndex].status, 
            description: description ||tasks[taskIndex].description, 
            due_date: due_date || tasks[taskIndex].due_date,
            created_at: created_at || tasks[taskIndex].created_at
        }

        tasks[taskIndex] = {...tasks[taskIndex], ...taskDetail}
        
        await writeFileHelper(tasks)
    } catch (e){
        throw new Error("Task Update Failed")
    }
}

export const remove = async(id: string) =>{
    try{
        console.log('Removing record . . .')
        const tasks = await readFileHelper()
        const newTasks = tasks.filter((t: Tasks)=>t._id !==id)
        await writeFileHelper(newTasks)
        return true
    }catch(e){
        throw new Error("Task Delete Failed")
    }
}