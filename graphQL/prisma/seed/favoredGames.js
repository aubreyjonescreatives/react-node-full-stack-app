const { PrismaClient } = require('@prisma/client')

const game_favorites = require('./favoritegames.json')


const prisma = new PrismaClient() 


async function loadGameSeed() {
const gamerinfo = game_favorites['favoritegames'].gamerinfo
return gamerinfo.map((gf) => {
return {
    data: {
        gamer: gf.gamer, 
        gamerlevel: gf.gamerlevel, 
        avatar: gf.avatar, 
        games: gf.games.title,
        description: gf.description, 
        defaultCredits: gf.defaultCredits, 

    }
}

})
}

async function main() {
    const Gamers = await loadGameSeed() 
    for (const gf of Gamers) {
        try {
            await prisma.gamerinfo.create(gf)
        } catch(error) {
            console.log(`Error creating game: ${error}`)
        }
    }
}


main() 
.catch((e) => {
    throw e
})
.finally(async () => {
    await prisma.$disconnect() 
})