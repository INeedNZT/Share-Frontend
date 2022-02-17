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
    IonRouterLink,
    IonRadio,
    IonRadioGroup,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import './Register.css';

const RegisterPage: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [text, setText] = useState<string>();
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
                        <IonLabel position="floating">NickName</IonLabel>
                        <IonInput value={text} placeholder="name show in the chat" onIonChange={e => setText(e.detail.value!)}></IonInput>
                    </IonItem>
                    <br />

                    <IonItem>
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput type="number" value={number} placeholder="your number of age" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
                    </IonItem>
                    <br />

                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        <IonListHeader>
                            <h4>Sex</h4>
                        </IonListHeader>

                        <IonItem>
                            <IonLabel>Male</IonLabel>
                            <IonRadio slot="end" value="male" />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Female</IonLabel>
                            <IonRadio slot="end" value="female" />
                        </IonItem>

                    </IonRadioGroup>
                </IonList>
                <br />

                <IonGrid>
                    <IonRow >
                        <IonCol className="ion-text-center"><IonButton color="success">Register</IonButton></IonCol>
                        <IonCol className="ion-text-center"><IonButton color="danger">Cancle</IonButton></IonCol>
                    </IonRow>
                    <br />
                    <IonRow >
                        <IonCol className="ion-text-center">
                            <IonRouterLink color="primary" href='/login'>
                                Has Account? Go to Login.
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonPage>



    );
};

export default RegisterPage;