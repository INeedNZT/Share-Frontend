import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import {
  IonApp,
  useIonViewWillEnter,
  IonRouterOutlet,
} from '@ionic/react';
import { createContext, useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import { io } from 'socket.io-client';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import GroupPage from './pages/Group';
import { C, User } from './type'
import GroupListPage from './pages/GroupList';
import ProfilePage from './pages/Profile';


let user: User = { userId: '', userName: '', password: '', sex: '', age:NaN };

const socket = io("ws://127.0.0.1:5000");
const t_socket = io("ws://127.0.0.1:7000");

export const SocketContext = createContext(socket);
export const TranslateContext = createContext(t_socket);
export const UserContext = createContext<C>(null);

const App: React.FC = () => {
  const [u, setU] = useState(user);

  useEffect(() => {
    console.log("user info has changed, ", u);
  }, [u])

  return (<IonApp>
    <UserContext.Provider value={{ u, setU }}>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/" component={GroupListPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/grouplist" render={props => <GroupListPage/>} />
          <Route path="/group/:id" component={GroupPage} />
          <Route path="/profile/:id" component={ProfilePage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </UserContext.Provider>
  </IonApp>
  );
}

export default App;
