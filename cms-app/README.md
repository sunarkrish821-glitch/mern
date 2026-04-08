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