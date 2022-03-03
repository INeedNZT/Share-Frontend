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
} from '@ionic/react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { User } from '../type';



const LoginPage: React.FC = () => {
    
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const c = useContext(UserContext);
    const history = useHistory();

   
    const loginEvent = (e: any) =>{
        if(c){
            c.u.userId = Math.floor(Math.random() * 5).toString();
            c.u.userName = userName;
            c.u.password = password;
            c.setU(c.u);
        }
        history.push("/grouplist");
    }


    useIonViewWillEnter(() => {
    });

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Share</IonTitle>
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
                        <IonInput value={userName} placeholder="your login id"></IonInput>
                    </IonItem>
                    <br />

                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} placeholder="password for login"></IonInput>
                    </IonItem>
                    <br />
                </IonList>
                <br />

                <IonGrid>
                    <IonRow >
                        <IonCol className="ion-text-center"><IonButton color="primary" onClick={loginEvent}>Login</IonButton></IonCol>
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