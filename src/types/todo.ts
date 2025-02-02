export interface TodoItem {
    id: string
    title: string
    time: string
    accentColor: string
    isCanvasAssignment?: boolean
    courseName?: string
}

export interface GroupedTodos {
    date: string
    items: TodoItem[]
}