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
    useIonViewWillEnter,
    useIonAlert
} from '@ionic/react';
import { useState, useContext } from 'react';
import './Register.css';
import { App } from '@capacitor/app';
import { UserContext, SocketContext } from '../App';
import { User, C } from '../type';
import { useHistory } from 'react-router-dom';

const RegisterPage: React.FC = () => {

    const socket = useContext(SocketContext);
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [age, setAge] = useState<number>();
    const [selected, setSelected] = useState<string>('');
    const [present] = useIonAlert();
    const history = useHistory();
    const c = useContext<C>(UserContext);

    useIonViewWillEnter(() => {

    });

    // sign up event, request register to the backend service
    const SignUpEvent = (e: any) => {
        socket.emit("register", { userName: userName, password: password, age: age, sex: selected }, (response: any) => {
            console.log("Successfully sign up,", c);
            if (response.result == "success") {
                c?.setU({ userName: userName, password: password, userId: response.userId, sex: selected });
                history.push("/grouplist");
            } else {
                present({
                    header: 'Register Failed',
                    message: 'Something wrong with sign up...',
                    buttons: [
                        'Try again'
                    ]
                })
            }
        })
    }

    
    const QuitEvent = (e: any) => {
        present({
            header: 'Quit Share?',
            message: 'Do you want to quit this app?',
            buttons: [
                // only for Android
                { text: 'Yes', handler: () => { App.exitApp(); } },
                "No"
            ]
        })
    }

    const toNum = (str: any) => {
        const num = parseInt(str!, 10)
        // check whether is NaN, if is NaN return undefined to make sure display correctly
        return isNaN(num) ? undefined : num;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><h2>Sign Up</h2></IonTitle>
                </IonToolbar>
            </IonHeader>


            <IonContent>
                <IonList>

                    <IonItem>
                        <IonLabel position="floating">User Name</IonLabel>
                        <IonInput value={userName} placeholder="your sign in ID and display name" onIonChange={e => setUserName(e.detail.value!)}></IonInput>
                    </IonItem>


                    <br />

                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type='password' value={password} placeholder="your password for sign in" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                    <br />

                    <IonItem>
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput type="number" value={age} placeholder="number of age" onIonChange={e => setAge(toNum(e.detail.value))}></IonInput>
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
                        <IonCol className="ion-text-center"><IonButton color="success" onClick={SignUpEvent}>Register</IonButton></IonCol>
                        <IonCol className="ion-text-center"><IonButton color="danger" onClick={QuitEvent}>Quit</IonButton></IonCol>
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