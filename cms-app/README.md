# Setup
    - 'pnpm create vite'
    - follow the steps to setup react 'typescript + react compiler'


    ## folder Architecture
      - keep everything inside '/src'
      ``` jsx
           /src   // keep everything code inside src
                /pages      // to keep all the url view
                  /<folder>      // to keep modularity in project
                  /components      // to keep small components for overall projects
                  /asset         // to keep all the resource required
                  /css
                  /images
                  /config         / all the configurations required
                  /lib      // library to keep any configurations or services developed
               ./main.tsx        // entry point for react   




               ## props drilling
               `````jsx
               const AComp = () => {
                return (<BComp props=("data")/>)
               }


               const BComp = ({props}) => {
                return (<CComp data=("props")/>)
               }

                  // leaf 
               const CComp = ({data}) => {
                return (<DComp/>)
               }

                   const DComp = ({data}) => {
                return {data}
               }
               


               ## Webhook
                 - can only be used with react functional components only
                 - never call/manipulate any state hook before first component render
                 - Always starts with 'use' keywords
                 - a. state maintenance
                      -`useState()`
               - if any state of a component is manipulated(changed/created), component will re-render

                   b. Performance optimitazion
                   - `useMemo()`, `useCallback()`, `useRef()`
                   c. Global State Management
                   - ` useContext()`, `useReducer`
                   d. Side Effect
                   - `useEffect()`, `use()`



```jsx
/// react effect hook
    useEffect(() => {
        console.log("I am always Loaded")
    })

       useEffect(() => {
        console.log("I will always render only once when components is mounted")
        return () => {
         setCredentials({
            ...credentials,
            username: "aditya"
         })
        }
    })

    setTimeoot(() => {
      setLoading(false)
    }, 1000)`



-----------------------------------------------------------------------------------------------------------
## Web Storage (can only store string)
   a. Cookies
     -  for a specific time period to store / it is time based
     - A bit of Security concern
     - Cross-Domain (Sub Domain) based
     -We can only store upto 200 to 400 kb
     - a cookie length can be4096 characters
     in order to setc cookie  " document.cookie = ''name=value; key=values;'
     'js cookie' package to maintain cookie
     `abc.com` => `xyz.com`


    b. Local Storage
          - not based on line
          - "key=value'
          - it can store upto `~5 -10 mb
          `localStorage.setItem(key, value), .getItem(key), .removeItem(key), .clear()`



    c. Session Storage
           -- only assign to a tab,
           - upon closing the tab, the session is cleared
           -`sessionStorage.setItem(key, value), .getItem(key), .removeItem(key), .clear()`


   ## React State Management
      - local state (`useState()`)
      - Global State
         a. `Context`
            - create (context)
            - Provide (Provider)
            - Consumption (Hook)
         b. Redux/Zustand/Jotai
              - create (store) 
              - Provide (Provider)
              - Consumption (Hook, Dispatch)      

        ## API Integration
           - Rest API
           - Client Connection or Call
           -XHR / Fetch or Axios (with react axios)
           -Axios
         - Methods and it's usuages
         - API-endpoint, documentation, payload, config(headers)  
          - https://dummyjson.com/




to build documentation
   -Postman 

    ## Types of API (CRUD operation)
    - REST, SOAP, GraphQL, gRPC
    - Private api, public api



    ## Every API Has some features like:
    - Request Architecture
        - URL => protocol:/baseUrl/path?query -> e.g. https://dummyjson.com/suth/login (endpoint)
        - method => (Create => POST, Read => GET, Update => Put/Patch, Delete => DELETE) => use post request
        - Payload => Data/body
        - Header => special config for an API

    - Response
        - status code => Success -> 2xx or error -> 4xx or 5xx or redirect -> 3xx    
        - cookies => Server side Cookies
        - Payload => Data Sent by API Server


  ## Global State Managemnet
  - context or redux
  context --> Light Weight state management
  Redux --> complex complete
  
              A
         B          C
    D        D F        G




    ### Product Create requests:
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  stock: number,
  tags: string[],
  brand: string,
  sku: string,
  weight: number,
  dimensions: {
    width: number,
    height: number,
    depth: number
  },
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  returnPolicy: string,
  minimumOrderQuantity: number,
  thumbnail: string,
  images: string[],
}