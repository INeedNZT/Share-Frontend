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
import { useState, useContext } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import './Group.css';
import Chat from '../components/Chat';
import { UserContext } from '../App';
import { UserDetailPageProps } from '../type';



const GroupPage: React.FC<UserDetailPageProps> = ({ match }) => {
    
    console.log("start code of Group page")

    useIonViewWillEnter(() => {
        console.log("enter Group View!!!!")
    });

    return (
        <div>
            <Chat groupId={match.params.id}></Chat>
        </div>
    );
};

export default GroupPage;