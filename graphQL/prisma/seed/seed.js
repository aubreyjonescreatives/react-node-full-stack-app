const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const gamerData = [
  {
    gamer: 'Alice',
    email: 'alice@prisma.io',
    gamerlevel: 21,
    avatar: 'game.png', 
    games: {
      create: [
        {
          title: 'BlackJack',
          description: 'Beat the dealer by getting close to 21',
          defaultCredits: '3',
          
        },
        {
          title: 'Hearts',
          description: '4 player card game',
          defaultCredits: '5',
          
        },
        {
          title: 'Solitaire',
          description: 'Card sorting game',
          defaultCredits: '4',
          
        },
      ],
    },
  },
  {
    gamer: 'Jordan',
    email: 'jordan@prisma.io',
    gamerlevel: 4,
    avatar: 'game2.png', 
    games: {
      create: [
        {
          title: 'Poker',
          description: 'A classic poker game',
          defaultCredits: '5',
          
        },
        {
          title: 'Freecell',
          description: 'Card sorting game',
          defaultCredits: '10',
          
        },
        {
          title: 'Spider Solitaire',
          description: 'Card sorting game',
          defaultCredits: '46',
          
        },
      ],
    },
  },
  {
    gamer: 'Taylor',
    email: 'taylor@prisma.io',
    gamerlevel: 105,
    avatar: 'game6.png', 
    games: {
      create: [
        {
          title: 'Slots',
          description: 'Get three of the same cards in a row to get the jackpot',
          defaultCredits: '1',
          
        },
        {
          title: 'Hearts',
          description: '4 player card game',
          defaultCredits: '5',
          
        },
        {
          title: ' Spider Solitaire',
          description: 'Card sorting game',
          defaultCredits: '34',
          
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const g of gamerData) {
    const gamer = await prisma.gamer.create({
      data: g,
    })
    console.log(`Created gamer with id: ${gamer.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })