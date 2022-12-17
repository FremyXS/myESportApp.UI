import { Apply, Game} from "./types";

export const games: Game[]=[
    {
        id: 1,
        name: 'CS:GO',
    },
    {
        id: 2,
        name: 'Dota 2',
    },
    {
        id: 3,
        name: 'Brawl Stars',
    },
    {
        id: 4,
        name: 'PUBG',
    },
    {
        id: 5,
        name: 'Fortnight',
    },
]

export const applyes: Apply[] =[
    {
        id: 1,
        header: 'Набор в комманду',
        countSeats: 6,
        countOccupiedSeats: 2,
        game: 1,
        usersLeft: [1, 2, 3, 4],
        usersRight: [5, 6, 7, 8],
    },
    {
        id: 2,
        header: 'Набор в комманду',
        countSeats: 6,
        countOccupiedSeats: 2,
        game: 1,
        usersLeft: [1, 2, 3, 4],
        usersRight: [5, 6, 7, 8],
    },
    {
        id: 3,
        header: 'Набор в комманду',
        countSeats: 6,
        countOccupiedSeats: 2,
        game: 2,
        usersLeft: [1, 2, 3, 4],
        usersRight: [5, 6, 7, 8],
    },
    {
        id: 4,
        header: 'Набор в комманду',
        countSeats: 6,
        countOccupiedSeats: 2,
        game: 2,
        usersLeft: [1, 2, 3, 4],
        usersRight: [5, 6, 7, 8],
    },
    {
        id: 5,
        header: 'Набор в комманду',
        countSeats: 6,
        countOccupiedSeats: 2,
        game: 4,
        usersLeft: [1, 2, 3, 4],
        usersRight: [5, 6, 7, 8],
    },
]