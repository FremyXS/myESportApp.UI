export type Apply = {
    id: number,
    countSeats: number,
    countOccupiedSeats: number,
    game: number,
    header: string,
    usersLeft: number[],
    usersRight: number[],
}

export type Game = {
    id: number,
    name: string,
}