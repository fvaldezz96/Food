import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Landing } from './componentes/Landing';
import { Home } from './componentes/Home';
import { CreateRecipe } from './componentes/CreateRecipe';
import { DetailRecipe } from './componentes/DetailRecipe';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='/create' component={CreateRecipe} />
          <Route path='/detail/:id' component={DetailRecipe} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}


