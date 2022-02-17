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
    IonRouterLink,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const LoginPage: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [text, setText] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [selected, setSelected] = useState<string>('');

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

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Become One of Us</IonTitle>
                </IonToolbar>
            </IonHeader>


            <IonContent>
                <IonList>
                    {/* {data.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel>{item}</IonLabel>
                </IonItem>
              )
            })} */}
                    {/* <IonLabel>Default Label</IonLabel> */}

                    <IonItem>
                        <IonLabel position="floating">User Name</IonLabel>
                        <IonInput value={text} placeholder="your login id" onIonChange={e => setText(e.detail.value!)}></IonInput>
                    </IonItem>
                    <br />

                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} placeholder="password for login" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                    <br />
                </IonList>
                <br />

                <IonGrid>
                    <IonRow >
                        <IonCol className="ion-text-center"><IonButton color="primary">Login</IonButton></IonCol>
                        <IonCol className="ion-text-center"><IonButton color="danger">Cancle</IonButton></IonCol>
                    </IonRow>
                    <br />
                    <IonRow >
                        <IonCol className="ion-text-center">
                            <IonRouterLink color="primary" href='/register'>
                                Create New Account? Go to Register.
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>


        </IonPage>
    );
};

export default LoginPage;