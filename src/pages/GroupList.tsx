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
    useIonViewWillEnter,
    IonRouterLink,
    IonRouterOutlet
} from '@ionic/react';
import { useState, useContext } from 'react';
import { useHistory, Route, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../App';
import GroupPage from './Group';
import './GroupList.css';


const GroupListPage: React.FC = () => {
    const c = useContext(UserContext);
    const history = useHistory();
    console.log(c)

    useIonViewWillEnter(() => {
        if (!(c?.u.userId)) {
            console.log(1111111);
            history.push("/login");
        }
    });

    return (
        <IonPage id="grouplist">
            <IonContent fullscreen>
                <IonListHeader>Recent Chat Channels</IonListHeader>
                <IonList class='pad'>
                    <IonItem>
                        <IonLabel><h2>
                            <IonRouterLink href='/group/1'>Group 1 </IonRouterLink>
                        </h2>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2>
                                <IonRouterLink href='/group/2'>Group 2</IonRouterLink>
                            </h2>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonRow>
                    <IonCol className="ion-text-center">
                        <IonRouterLink color="white" href='/login'>
                            Log out
                        </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>

    );
};

export default GroupListPage;