# Setup 
  - `pnpm create vite`
  - Follow the step to setup react `typescript + react Compiler`

## folder Architecture 
  - Keep everything inside `/src` 
  ```jsx
    /src // keep every codes inside src 
      /pages      // to keep all the url view
        /<folder>     // to keep modularity in project
      /components       // to keep small components for overall project
      /assets           // to keep all the resources required
        /css 
        /images
      /config           // all the configurations reuqired
      /lib              // Library to keep any configurations or services developed
      main.tsx          // entry point for react 
  ```

## Props Drilling 
```jsx
  const AComp = () => {
    return (<BCompo props={"data"} />)
  }


  const BComp = ({props}) => {
    return (<CCompo data={props} />)
  }

  const CComp = ({data}) => {
    // leaf 
    return <DComp data={data}/>
  }

  const DComp = ({data}) => {
    return {data}
  }
```
### Webhook 
  - can only be used with react functional components only
  - Never call/manipulate any state hook before first component render
  - Always starts with `use` keyword
  - a. State maintenence 
    - `useState()`
    - if any state of a component is manipulated(chaged/created),component will re-render
    b. Performance optimization 
    - `useMemo()`, `useCallback()`, `useRef()`
    c. Global State Management 
    - `useContext()`, `useReducer()`
    d. Side Effect
    - `useEffect()`, `use()`


```jsx
    // react effect hook 

      // setCredentials({
      //   ...credentials,
      //   username: "sandesh"
      // })

      useEffect(() => {
        // code block
        console.log("I am always loaded")
        // tracking logs 
      })

      useEffect(() => {
        // 
        // first data load
        console.log("I will always render only once when component is mounted")
        return () => {
          setCredentials({
            ...credentials,
            username: "sandesh@broadwayinfosys.com",
          });

          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      }, [])

      useEffect(() => {
        console.log("Only triggeres when credentials state changed")
      },[credentials])
  ```

--------------------------------------------------

# Web storage (can only store string)

a. Cookies 
  - for a specific time period to store 
  - A bit of security concern 
  - Cross-domain (Sub-domin) based 
  - ~200kb
  - a cookie length can be of 4096chars
  - `document.cookie= 'name=value; key=value;'`
  - `js-cookie` package to maintain cookie
  - `abc.com` => `xyz.com`
  - e.g. login data (token)

b. Local Storage
  - not based on time
  - `key=value`
  - it can store upto ~5-10mb
  - `localStorage.setItem(key, value), localStorage.getItem(key), localStorage.removeItem(key), localStorage.clear()`
  - persisting data
c. Session Storage
  - only assigned to a tab,
  - upon closing the tab, the session is cleared
  - `sessionStorage.setItem(key, value), sessionStorage.getItem(key), sessionStorage.removeItem(key), sessionStorage.clear()`


## React State management
  - local State (`useState()`)
  - Global State 
    a. `Context`
      - Create (Context)
      - Provide (Provider)
      - Consumption (Hook)
    b. Redux/Zustand/Jotai
      - Create (store)
      - Provide (Provider)
      - Consumption (Hook/dispatch)


## API Integration 
  - REST Api 
  - Client Connection or call 
    - XHR / fetch or axios (with react axios)
    - Axios 
  - Methods and it's usages 
  - API-endpoint, documentation, payload, config(headers)
  - https://dummyjson.com/

## Types of API (CRUD operation)
  - REST, SOAP, GraphQL, gRPC
  - private api, public api


# Every API Has some features like:
- Request Architecture 
  - url => protocol://baseUrl/path?query -> e.g. https://dummyjson.com/auth/login (endpoint)
  - method => (Create => POST, Read => GET, Update => PUT/PATCH, Delete => DELETE) => use post req
  - Payload(optional) => Data/body
  - Headers => special config for an api 

- Response 
  - status code => Success -> 2xx or error -> 4xx or 5xx or redirect -> 3xx
  - cookies => Server side cookies
  - payload => data sent by api server

## Global State management 
  - Context or redux
  - context -> Light weight state management
  - complex complete -> Redux 

                  
                    A 
              B         C
          D       E   F     G




### Product Create request: 
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;



```jsx
  // Imports at top of your file 
  export interface IComponentNameProps{
    props1: dataType, 
    props2?: dataType
  }
  export default function ComponentName({props1, props2=defaultValue}: Readonly<IcomponentNameProps>) {
    const params = useParams()
    const [query, setQuery] = useSearchParams()
    const [data, setData] = useState()

    // states define
    const networkCaller = async () => {
      // access the api server for data
    }
    useEffect(() => {
      networkCaller()
    }, [])    
    return (<>
      Component's UI
        List 
    </>)
  }
```


# Redux (State management => Volatile)
  - Hydrated vs Dehydrated
  - 3 component 
    - Action(UI-react Application) - (global <small states>) - Reducers(state and action)
    -  