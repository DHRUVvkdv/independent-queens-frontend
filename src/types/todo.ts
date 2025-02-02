export interface TodoItem {
    id: string
    title: string
    time: string
    accentColor: string
}

export interface GroupedTodos {
    date: string
    items: TodoItem[]
}