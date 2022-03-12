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
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import './GroupList.css';


const GroupListPage: React.FC = () => {
    const c = useContext(UserContext);
    console.log("start code of GroupList page");
    console.log("get user context, ", c);
    const history = useHistory();

    useIonViewWillEnter(() => {
        if (!(c?.u.userId)) {
            console.log("Grouplist page can't find user info, back to login page.");
            history.push("/login");
        }
    });

    return (
        <IonPage id="grouplist">
            <IonHeader>
                <IonToolbar>
                    <IonTitle><h2>Share</h2></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='pad'>
                    <IonListHeader>Recent Chat Channels</IonListHeader>
                    <IonList>
                        <IonItem>
                            <IonLabel>
                                <h2>
                                    <Link to='/group/1'>Group 1 </Link>
                                </h2>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <h2>
                                    <Link to='/group/2'>Group 2</Link>
                                </h2>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <IonRow>
                    <IonCol className="ion-text-center">
                        {/* use IonRouterLink to clear the userContext */}
                        <IonRouterLink color="white" href='/login'>
                            <b><h4>Log out</h4></b>
                        </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>

    );
};

export default GroupListPage;