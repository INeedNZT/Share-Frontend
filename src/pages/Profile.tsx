import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonList,
    IonItem,
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonRadioGroup,
    IonListHeader,
    IonRadio,
    IonThumbnail,
    IonImg,
    IonRouterLink,
    IonButton,
    useIonAlert
} from '@ionic/react';
import './Profile.css';
import { UserContext, SocketContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import { add, personCircleOutline, copyOutline, exitOutline } from 'ionicons/icons';
import { UserDetailPageProps } from '../type';
import { useContext, useState } from 'react';



const ProfilePage: React.FC<UserDetailPageProps> = ({ match }) => {

    const c = useContext(UserContext);
    console.log("start code of Article page")
    console.log("get user context, ", c);

    const socket = useContext(SocketContext);
    const userName = c?.u.userName;
    const [password, setPassword] = useState<string>("");
    const [age, setAge] = useState<number>();
    const [selected, setSelected] = useState<string>('');
    const [present] = useIonAlert();
    const history = useHistory();

    const toNum = (str: any) => {
        const num = parseInt(str!, 10)
        // check whether is NaN, if is NaN return undefined to make sure display correctly
        return isNaN(num) ? undefined : num;
    }

    useIonViewWillEnter(() => {
        console.log("enter Profile View!!!!")
        console.log(c?.u)
        setPassword(c!.u.password)
        setSelected(c!.u.sex);
        setAge(c!.u.age);
    });

    const ConfirmEvent = () => {
        socket.emit("updateUser", { userName: userName, password: password, age: age, sex: selected, userId:c?.u.userId }, (response: any) => {
            console.log("Successfully update user,", c);
            if (response.result == "success") {
                c?.setU({ userName: userName, password: password, userId: c.u.userId, sex: selected, age:age });
                present({
                    header: 'Update Success',
                    message: 'Successfully update the profile!',
                    buttons: [
                        'Okay'
                    ]
                })
            } else {
                present({
                    header: 'Update Failed',
                    message: 'Something wrong with update...',
                    buttons: [
                        'Try again'
                    ]
                })
            }
        })
    }

    const CancelEvent = () => {
        setPassword(c!.u.password)
        setSelected(c!.u.sex);
        setAge(c!.u.age);
    }

    return (
        <div id='profile'>
            <IonMenu side="start" menuId="leftmenu" contentId='p' swipeGesture={true}>
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

            <IonPage id='p'>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton slot='start'></IonMenuButton>
                        </IonButtons>
                        <IonTitle><span className='title'>Share</span></IonTitle>

                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonGrid>
                        <IonRow>
                            <IonCol className='center'>
                                {(() => {
                                    return c?.u.sex == 'male' ? (<IonItem lines='none'><IonThumbnail>
                                        <IonImg src="/assets/male1.png" />
                                    </IonThumbnail></IonItem>) : (<IonItem lines='none'><IonThumbnail>
                                        <IonImg src="/assets/female1.png" />
                                    </IonThumbnail></IonItem>)
                                })()}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonItem>
                                <IonLabel>User Name</IonLabel>
                                <IonInput value={userName} disabled={true} ></IonInput>
                            </IonItem>
                        </IonRow>

                        <IonRow>
                            <IonItem>
                                <IonLabel>Password</IonLabel>
                                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} placeholder="password for sign in"></IonInput>
                            </IonItem>
                        </IonRow>

                        <IonRow>
                            <IonItem>
                                <IonLabel>Age</IonLabel>
                                <IonInput type="number" value={age} onIonChange={e => setAge(toNum(e.detail.value))} placeholder="number of age"></IonInput>
                            </IonItem>
                        </IonRow>

                        <IonRow>
                            <IonItem lines='none'>
                                <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                                    <IonItem className="ion-no-padding">
                                        <IonLabel>Sex</IonLabel>


                                        <IonItem lines='none'>
                                            <IonLabel>Male</IonLabel>
                                            <IonRadio slot="end" value="male" />
                                        </IonItem>
                                        <IonItem lines='none'>
                                            <IonLabel>Female</IonLabel>
                                            <IonRadio slot="end" value="female" />
                                        </IonItem>
                                    </IonItem>

                                </IonRadioGroup>
                            </IonItem>
                        </IonRow>

                        <br />

                        <IonRow >
                            <IonCol className="ion-text-center"><IonButton color="primary" onClick={ConfirmEvent}>Confirm</IonButton></IonCol>
                            <IonCol className="ion-text-center"><IonButton color="danger" onClick={CancelEvent}>Cancel</IonButton></IonCol>
                        </IonRow>



                    </IonGrid>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default ProfilePage;