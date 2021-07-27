# React based currency exchange as Interview Task for Data-Robot interview

The goal of this test is to build a Currency Converter application with React. It will contain two basic
functionalities, the first is to convert from a specific currency to another using a third-party API (feel
free to choose any APIs you prefer). The second part should contain a chart that shows the last 24
hours rates history for a pair of currencies.
Must have
- Use React Suspense to show a placeholder while data is being fetched.
- Create reusable components (Each component should have a separate CSS module).
- Use D3.js to create a zoomable chart.
- The web app should be responsive across all screen sizes (Using media queries)
- Inputs should be validated (only integers/decimals allowed), and have live price calculation
when typing (There is no submit button).
- Don't use Redux (Context API can do the job).
Bonus points
- CSS animations.
- CSS variables to handle theme switching (Light/Dark).
- Minimal dependencies.
- Being creative 😉.

# Comments
I never had figma design so I was simplistic regarding the design and implementation. Also based on the requirement * Minimal dependencies I wasn't using any packages that I would regurlarly use in current circumstances e.g prop-types (if I would keep using JS), sass/scss, typescript, styled components (eases up theme switching) etc. 
And probably would use react-d3-components for better sync with virtual DOM

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
