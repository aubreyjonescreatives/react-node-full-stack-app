const { PrismaClient } = require('@prisma/client')

const game_seed = require('./gameslist.json')


const prisma = new PrismaClient() 


async function loadGameSeed() {
const allGames = game_seed['gameslist'].game
return allGames.map((gm) => {
return {
    data: {
        image: gm.image,
        title: gm.title,
        description: gm.description, 
        defaultCredits: gm.defaultCredits,
        price: gm.price, 
        gameformat: gm.gameformat, 
        link: gm.link

    }
}

})
}

async function main() {
    const allGames = await loadGameSeed() 
    for (const gm of allGames) {
        try {
            await prisma.game.create(gm)
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
