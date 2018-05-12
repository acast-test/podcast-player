# Usage #

 - run `npm install` to install dependencies
 - run tests by running `npm run test`
 - make sure that the server is running on `http://localhost:1337`
 - navigate to `http://localhost:8080` to open app

## Solution description

- I use only `/episodes` endpoint from api. Did not see reason to use endpoint to get episode by id, since it returns the same data as I already have in the list. If `/episodes` was returning just some information neccesary to display list of episodes (for example, only `id` and `name`) and get episode by id endpoint would return additional information needed to play episode, I would have used it then.

- did not separate production/dev.. environments. There is no production build as well.

- Error handling just displays errors in an error bar, it should have a button to dismiss error and then error id should be 
used to do that. It might be a good idea to have a error handling in middleware where `fetch` is being performed as well depending on how application grows. Also, `<audio />` elements should have error handling by using `onerror` event on `<audio />` tag.

- `fetchEpisodes` action creator has a hardcoded url (including api host) - this one should be defined through webpack `DefinePlugin` and vary depending on environment (prod/dev/staging ..) or handled in some another way, but not hardcoded.

- I would have a separate module for api calls in general which exposes action creators - the ones thate create `redux-effects` actions. This module would live in it's own npm package and have it's own independent tests. Usage would be something like:
  
  ```js
  import { fetchEpisodes } from '@podcast/api-client'
  
  class Noop extends React.Component {
    componentWillMount() {
      this.props.fetchEpisodes();
    }
    
    // ...
  }
  ```
  
  It might be not very hard to automate generation of this module from let's say api documentation.
  
 - For css sass is used together with [BEM](http://getbem.com/) (following naming conventions as well). For more complex css modifications/interactions I would have used [styled-components](https://github.com/styled-components/styled-components). I did not spend much time on css and design.
  
 - Application is organized into folders - `errors` and `podcasts`. The idea is that one can take the whole folder (`feature`) and move it anywhere independently. Also, when application is divided in such way, it's easier to develop without affecting other modules in application. If one module needs to use something from other module, they can communicate through interface which is exported through `index.js` (e.g exported `selectors`) like in `errors` case (`getErrors` in that case is just a dummy selector to demonstrate this purpose).

 - When using `getErrors(state.errors)`, selector accepts only the part of errors state, so we don't pass the whole state object, it's  good, but I would have somewhere a general file which imports all the selectors from all the modules and exports them, but exports        them with state already `bound` to specific part, something like this:
 
   ```js
    // contents of src/selectors.js
    import {selectors} from './errors'

    export const getErrors = (state) => selectors.getErrors(state.errors);
   ```
   
   And then components just import selectors from `src/selectors` and just pass whole state to selector without needing to worry  everytime about how state structure looks like.
  
  - There are no mocks in tests at all, for example in `Podcasts.test.js` there is a tests which checks if `fetchEpisodes` was called when component mounted:

    ```js
        it('fetches episodes', () => {
            // arrange
            const fetchEpisodes = jest.fn();

            // act
            const wrapper = mount(<Podcasts fetchEpisodes={fetchEpisodes} />);

            // assert
            expect(fetchEpisodes).toHaveBeenCalled();
        });
    ```
  
   if component had a side effect, one would need to mock server for this test. But now fetching lives in it's own world not related to components - in a middleware.
  
  - in general such small application wouldn't need `redux`, but the task was to look also in that application will grow and I also wanted to show how I move side effects away from components via using `redux-effects`.
