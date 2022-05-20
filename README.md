# London Study
### [ajcousins.github.io/london-study/](https://ajcousins.github.io/london-study/)

Graphic study of London journey times from a single point, using the public TfL API.

---
### `npm start`

Runs the app in the development mode.\

---
## Data Builder
Data can be collected for a specific origin point in London.
1. Add postcode string to  data_builder/src/manageBuild.ts:
```
const TARGET = 'se17lt';
```
2. `cd data_builder` 
3. `npm run setup-cells` to prepare blank data file.
4. `npm run manage-build` to collect jounery times.