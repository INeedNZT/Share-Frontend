import {
  IonPage,
  useIonViewWillEnter
} from '@ionic/react';
import { useState, useContext } from 'react';
import './Home.css';
import LoginPage from './Login'
import RegisterPage from './Register';
import { io } from 'socket.io-client';
import GroupListPage from './GroupList';
import { UserContext } from '../App';

const HomePage: React.FC = () => {
  const c = useContext(UserContext);

  console.log(c)
  return (

    <IonPage>
        {
          c?.u.userId ? (<GroupListPage></GroupListPage>)
            : (<LoginPage></LoginPage>)
        }
    </IonPage>
  );
};

export default HomePage;