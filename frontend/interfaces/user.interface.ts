export interface IUser {
    user_id: string
    username?: string
    first_name?: string
    points: number
    completed_tests: string[]
}

export interface ITopUser {
    first_name: string | null
    username: string | null
    points: number
}