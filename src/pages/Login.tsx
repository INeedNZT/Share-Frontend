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
    IonRouterLink,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    useIonViewWillEnter,
    useIonAlert
} from '@ionic/react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext, SocketContext } from '../App';
import { User, C } from '../type';
import { App } from '@capacitor/app';



const LoginPage: React.FC = () => {

    const socket = useContext(SocketContext);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const c = useContext<C>(UserContext);
    const history = useHistory();
    const [present] = useIonAlert();

    // login event request from the backend
    const loginEvent = (e: any) => {
        socket.emit("login", { userName: userName, password: password }, (response: any) => {
            console.log("Successfully log in,", c);
            if (response.result == "success") {
                c?.setU({ userName: userName, password: password, userId: response.userId, sex: response.sex, age: response.age });
                history.push("/grouplist");
            } else {
                present({
                    header: 'User Not Found',
                    message: 'user name or password are not matched!',
                    buttons: [
                      'OK'
                    ]
                  })
            }
        })
    }

    // quit click event
    const QuitEvent = (e:any) =>{
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


    useIonViewWillEnter(() => {
    });

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle><h2>Sign In</h2></IonTitle>
                </IonToolbar>
            </IonHeader>


            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">User Name</IonLabel>
                        <IonInput value={userName} onIonChange={e => setUserName(e.detail.value!)} placeholder="your user name for sign in"></IonInput>
                    </IonItem>
                    <br />

                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} placeholder="password for sign in"></IonInput>
                    </IonItem>
                    <br />
                </IonList>
                <br />

                <IonGrid>
                    <IonRow >
                        <IonCol className="ion-text-center"><IonButton color="primary" onClick={(e) => loginEvent(e)}>Login</IonButton></IonCol>
                        <IonCol className="ion-text-center"><IonButton color="danger" onClick={QuitEvent}>Quit</IonButton></IonCol>
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