import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import LoginPage from './Login'
import RegisterPage from './Register';

const HomePage: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  

  const pushData = () => {
    const max = data.length + 20;
    const min = max - 20;
    const newData = [];
    for (let i = min; i < max; i++) {
      newData.push('Item' + i);
    }

    setData([
      ...data,
      ...newData
    ]);

  }
  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
    },
      500);
  }

  useIonViewWillEnter(() => {
    pushData();
  });

  return (
    <IonPage>
     <RegisterPage></RegisterPage>

    </IonPage>



  );
};

export default HomePage;