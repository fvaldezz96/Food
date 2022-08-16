import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Landing } from './componentes/Landing';
import { Home } from './componentes/Home';
import { CreateRecipe } from './componentes/CreateRecipe';
import { DetailRecipe } from './componentes/DetailRecipe';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create' component={CreateRecipe} />
          <Route exact path='/detail/:id' component={DetailRecipe} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}