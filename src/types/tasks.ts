
interface Tasks{
    _id?: string,
    ordinal: number,
    added_by: string,
    title: string,
    description: string,
    status: string,
    due_date: string,
    created_at: string
}
interface TaskInput{
    ordinal: number,
    added_by: string,
    title: string,
    description: string,
    status: string,
    due_date: string,
    created_at: string
}