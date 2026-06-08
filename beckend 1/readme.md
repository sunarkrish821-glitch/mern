# Setting up an express project with nodejs
## Step 1
  - make a folder `api-62/`
## Step 2 
  - setup node project 
  - `> cd api-62/`
  - `> pnpm init`
## Step 3
  - Install Dependencies and Dev Depenedencies
  - `> pnpm install express`
  - `> pnpm install --save-dev @types/node typescript ts-node nodemon @types/express`
## Step 4
  - Setup `tsconfig` 
  - `> npx tsc --init`
  - Update your `tsconfig` with the following codes 
  ```json
    {
      "compilerOptions": {
        "outDir": "./dist",

        "module": "nodenext",
        "target": "esnext",
        "lib": ["esnext"],
        "types": ["node"],
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,

        // Stricter Typechecking Options
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true,

        // Style Options
        "noUnusedLocals": true,
        // "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
      
        // Recommended Options
        "strict": true,
        // "jsx": "react-jsx",
        "verbatimModuleSyntax": true,
        "isolatedModules": true,
        "noUncheckedSideEffectImports": true,
        "moduleDetection": "force",
        "skipLibCheck": true,

        "esModuleInterop": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
  ```
  - Industry base config 
  ```json
    {
      "compilerOptions": {
        "rootDir": "./",
        "outDir": "./dist",
        "module": "CommonJS",
        "target": "ES2020",
        "types": ["node"],
        "lib": ["ES2020"],
        "strict": true, 
        "esModuleInterop": true,
        "moduleResolution": "node",
        "allowJs": true,
        "isolatedModules": true,
        "skipLibCheck": true,,
        "sourceMap": true, 
        "resolveJsonModule": true, 
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "./dist"]
    }
  ```
## Step 5
  - Update your `package.json` file 
  - Add the following in your `script` section 
  ```json
    {
      // ...
      "script": {
        "dev": "nodemon ./index.ts",
        "start": "node ./dist/index.js",
        "build": "tsc"
        // ...
      }
    }
  ```
## Setup 6
  - create a file named `index.ts` at your root 
  - Develop a server interface 
  ```ts
    // /index.ts
    import http from "http"

    const server = http.createServer()    // pass app later 

    const HOST = "127.0.0.1"
    const PORT = 9005

    server.listen(PORT, HOST, () => {
      //
      console.log("Server is running in port "+PORT)
      console.log("Press CTRL+C to disconnect server")
    })

    server.on("error", (err) => {
      console.error(err)
      console.error("Server crashed due to ", err.message)
      process.exit(1)     // disconnect or ends our node process
    })
  ```
## Step 7 
  - Setup express 
  - Prepare a folder `/src` in root 
  - Create a file `./src/app.ts` for express configuration 
  ```ts
  // ./src/app.ts

  import express, {type Application} from "express"
  const app: Application = express()

  export default app;
  ```
  - Mount the app in `index.ts`
  ```ts 
  // /index.ts
  //....
  // import ....
  import app from "./src/app"

  const server = http.createServer(app)

  // ....
  ```
## Step 8 
  - Run your codebase 
  - in terminal from root location run `> pnpm dev`


## System Architecture 
  - Logic/Application login
  - Data logic (Database logic)
  - MVC Pattern 
  - Model . View(postman) . Controller


```
Request ===> Router ===> [Middleware] ==> Controller(business logic) <=====> Model <====> Db Operation
                              ========> JSON response(View)
```

```txt 
  - src/
    - modules/
      - auth/
        - AuthControler.ts
        - AuthModel.ts
        - AuthRouter.ts
        - AuthRequest.ts
        - AuthService.ts

  - src/
    - controller
      - AuthController.ts
    - request 
      - AuthRequest.ts
    - router
      - AuthRouter.ts
```


```js
  //  ./src/router/router.ts
  ...
  router.use('/auth', authRouter)

  // ./src/app.ts
  ...
  app.use("/api/v1/",router);
  app.use('/api/v2/', router)
  // O - Open-closed principle 
  // open to expansion but closed to modification 
  // payment gateway (esewa)
    // develop another version which should be used by new version 

  // https://api.custom.tld/api/v1/auth/login
  // https://api.custom.tld/api/v1/auth/register
  // https://api.custom.tld/api/v1/auth/forget-password
  // https://api.custom.tld/api/v1/auth/reset-password
  // https://api.custom.tld/api/v1/auth/logout

```

# DB
## Library - ORM  or ODM
  - Db physical data -> table or collection
## NoSQL (Non-relational DBMS)
  - ODM (Object Document Mapping)
  - MongoDB > `mongoose`
## SQL ( Relational DBMS)
  - ORM (Object Relational Mapping)
  - SQL(pg, mysql, mariadb, oracle, ...) > `sequelize`, `typeorm`, `prisma`

## Setup Server 
  - Localize 
  - Online 
    - Atlas

  ```env
    # atlas Admin Username and Password
    USERNAME= backend
    PASSWORD= Y3xlGAm0yvnSX2bl

    username= user-1
    password: XxBirgMpC3GAH2j2
  ```

# Db server config 
  - DB connection 
  - DB Database 
  - DB Tables


# DB with codebase 
  - Connection 
  - DB Modelling 

# Model 
  - Data structure 
  ```json
    {
     
      "company": {
        "department": "Engineering",
        "name": "Dooley, Kozey and Cronin",
        "title": "Sales Manager",
        "address": {
          "address": "263 Tenth Street",
          "city": "San Francisco",
          "state": "Wisconsin",
          "stateCode": "WI",
          "postalCode": "37657",
          "coordinates": {
            "lat": 71.814525,
            "lng": -161.150263
          },
          "country": "United States"
        }
      },
      "ein": "977-175",
      "ssn": "900-590-289",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "admin" // or "moderator", or "user"
    }
```

```json
  {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 7.17,
    "stock": 5,
    "tags": [
      "beauty",
      "mascara"
    ],
    "brand": "Essence",
    "weight": 2,
    "dimensions": {
      "width": 23.17,
      "height": 14.43,
      "depth": 28.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "Low Stock",
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 24,
    "thumbnail": "...",
    "images": ["...", "...", "..."]
  }
```

# SMTP Server 
  - `gmail`, `SES`, `sendgrid`, `any other`
  - host, 
  - port 
  - auth
    - username 
    - password
  - from address


# Editor 
  - cli 
  - notepad 
  - notepad++
  - Dreamweaver (Adobe)
  - Sublime text - atom, bracket 
  - Vs-Code (Open Source)
  - Jetbrains IDE (webstorm, phpstorm, Android studio, idea, )
  - AI 
    - Cursor 
    - Antigravity
    - Windsurf




  