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
    IonCol,
    useIonViewWillEnter,
    IonRouterLink,
    IonIcon,
    IonMenu,
    IonButtons,
    IonMenuButton,
    useIonViewDidEnter
} from '@ionic/react';
import { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { add, personCircleOutline, copyOutline, exitOutline } from 'ionicons/icons';
import './GroupList.css';


const GroupListPage: React.FC = () => {
    const c = useContext(UserContext);
    console.log("start code of GroupList page");
    console.log("get user context, ", c);
    const history = useHistory();
    const ionMenuEle = useRef<HTMLIonMenuElement>(null);

    useIonViewWillEnter(() => {
        // if (!(c?.u.userId)) {
        //     console.log("Grouplist page can't find user info, back to login page.");
        //     history.push("/login");
        // }
    });

    useIonViewDidEnter(() => {
        ionMenuEle.current!.style.visibility = 'visible';
    })

    return (
        <div>
            <IonMenu style={{ 'visibility': 'hidden' }} ref={ionMenuEle}
                side="start" menuId="leftmenu" contentId='grouplist' swipeGesture={true}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <Link to={'/profile/' + c?.u.userId}>
                                <IonIcon icon={personCircleOutline}></IonIcon>
                                <span className='menu-icon'>Profile</span>
                            </Link>
                        </IonItem>
                        <IonItem>
                            <Link to='/grouplist'>
                                <IonIcon icon={copyOutline}></IonIcon>
                                <span className='menu-icon'>Group List</span>
                            </Link>
                        </IonItem>
                        <IonItem>
                            <IonRouterLink href='/login' color='danger'>
                                <IonIcon icon={exitOutline}></IonIcon>
                                <span className='menu-icon'>Exit</span>
                            </IonRouterLink>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonPage id="grouplist">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton slot='start'></IonMenuButton>
                        </IonButtons>
                        <IonTitle><span className='title'>Share</span></IonTitle>
                        {/* <IonButtons slot='end'>
                            <IonButton fill='clear' type='button' slot='end'>
                                <IonIcon icon={add} />
                                Create Channel
                            </IonButton>
                        </IonButtons> */}
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <div className='pad'>
                        <IonListHeader>Recent Chat Channels</IonListHeader>
                        <IonList>
                            <IonItem>
                                <IonLabel>
                                    <h2>
                                        <Link to='/group/1'>Channel 1 </Link>
                                    </h2>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h2>
                                        <Link to='/group/2'>Channel 2</Link>
                                    </h2>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </div>
                    {/* <IonCol className="ion-text-center">
                        use IonRouterLink to clear the userContext
                        <IonRouterLink color="danger" href='/login'>
                            <b><h4>Log out</h4></b>
                        </IonRouterLink>
                    </IonCol> */}
                </IonContent>
            </IonPage>
        </div>

    );
};

export default GroupListPage;