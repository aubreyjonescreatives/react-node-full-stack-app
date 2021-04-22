## This Github folder contains a graphql server. Developers can download this specific folder to operate it on a localhost:4000 window. 

## To run this locally on your machine, you will first have to download docker found by this link as I have a Docker-based PostgreSQL as my datastore: 

https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=dockerhomepage&utm_content=namer&utm_term=dockerhomepage&utm_budget=growth&gclid=CjwKCAjwmv-DBhAMEiwA7xYrd1H7zUwr-zsEQ9r73h_0Ns7YHBVoOHUk4bPPRptIS56f8R7v2IEiHxoCYeIQAvD_BwE  

## After you have downloaded docker and the graphql folder, you will need to follow my scripts tag accessed by my package.json file in this order using NPM: 

1. npm run launchDocker (to create the docker datastore) 
2. npm run migrate (to migrate prisma)
3. npm run seed:game (to add datastore to docker)
4. npm run dev (to start up the nodemon and server.js) 


## By now, you should have access to your localhost:4000 to view the graphql server via localhost

## Here are key points to this graphql server: 


* Prisma as your data modeling tool

```
generator client {
  provider = "prisma-client-js"
}


datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

## Docker-based PostgreSQL or MySQL as your data store

![docker](../images/docer.PNG)


## At least 3 Query resolvers allowing users to get data from your server

1. allGamers
2. allGames
3. gameById

```
 const Query = objectType({
    name: 'Query',
    definition(t) {
      t.nonNull.list.nonNull.field('allGamers', {
        type: 'Gamer',
        resolve: (_parent, _args, context) => {
          return context.prisma.gamer.findMany()
        },
      })

      t.nonNull.list.nonNull.field('allGames', {
        type: 'Game',
        resolve: (_parent, _args, context) => {
          return context.prisma.game.findMany()
        },
      })
  
      t.nullable.field('gameById', {
        type: 'Game',
        args: {
          id: intArg(),
        },
        resolve: (_parent, args, context) => {
          return context.prisma.game.findUnique({
            where: { id: args.id || undefined },
          })
        },
      })

```


## At least 2 Mutation resolvers allowing users to create, update, or upsert an item.


### Create Mutations:

1. Mutation 1: CreateGamer 
2. Mutation 2: createGame


```
const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
       t.nonNull.field('CreateGamer', {
        type: 'Gamer',
        args: {
          data: nonNull(
            arg({
              type: 'GamerCreateInput',
            }),
          ),
        },
        resolve: (_, args, context) => {
          return context.prisma.gamer.create({
            data: {
              gamer: args.data.gamer,
              email: args.data.email,
            },
          })
        },
      }) 
  
      t.field('createGame', {
        type: 'Game',
        args: {
          data: nonNull(
            arg({
              type: 'GameCreateInput',
            }),
          ),
          email: nonNull(stringArg()),
        },
        resolve: (_, args, context) => {
          return context.prisma.game.create({
            data: {
              title: args.data.title,
              description: args.data.content,
              gamer: {
                connect: { email: args.authorEmail },
              },
            },
          })
        },
      })

```


### Update Mutation:

3. Mutation 3: 


```
    t.field('updateGame', {
        type: 'Game',
        args: {
          id: nonNull(intArg()),
          data: nonNull(
            arg({
              type: 'GameCreateInput',
            }),
          ),
        },
        resolve: (_, args, context) => {
          return context.prisma.game.update({
            where: { id: args.id || undefined },
            data: {
             title: args.data.title, 
             description: args.data.description, 
             defaultCredits: args.data.defaultCredits, 
            
            },
          })
        },
      })

```

## At least 1 Mutation resolver allowing users to delete an item.


### Delete Mutation: 

4. Mutation 4: 



```

      t.field('deleteGame', {
        type: 'Game',
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context) => {
          return context.prisma.game.delete({
            where: { id: args.id },
          })
        },
      })
    },
  })
   




```


## Your datastore will contain at least 25 items

### Utilizing NPM run seed:game will add at least 25 items to your datastore via gameslist.json and gamesSeed.js


## Your app will be deployable locally using Docker and will have seed data entered into the datastore.

### I use docker and can seed data from the gamesSeed.js connection: 


```
const { PrismaClient } = require('@prisma/client')

const game_seed = require('./gameslist.json')


const prisma = new PrismaClient() 


async function loadGameSeed() {
const allGames = game_seed['gameslist'].game
return allGames.map((gm) => {
return {
    data: {
        title: gm.title,
        description: gm.description, 
        defaultCredits: gm.defaultCredits, 

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



```

## All of your source code will be properly uploaded to GitHub

### This is my github repo folder for the graphql source code.

## Your ReadMe file will accurately describe your server install and run process and how to use the APIs

### This is how I recommend downloading and installing this process to see data in your localhost:4000