import {
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    useIonViewWillEnter,
    IonFooter,
    IonPage
} from '@ionic/react';

import { useState } from 'react';
import './Chat.css'
import { paperPlaneOutline, addCircleOutline } from 'ionicons/icons';


const Chat: React.FC = () => {
    const [text, setText] = useState<string>();


    return (
        <IonPage>
            <div id="chat">
                <IonListHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="home" />
                        </IonButtons>
                        <IonTitle>Group Chat</IonTitle>
                    </IonToolbar>
                </IonListHeader>

                <IonContent fullscreen={true}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>

                                    <div slot="end" className='bubble success slotted-fix'>
                                        <p>
                                            Nice to meet you!
                                        </p>
                                    </div>
                                    <IonAvatar slot='end' className="mr-fix">
                                        <img src="/assets/male1.png" />
                                    </IonAvatar>
                                </IonItem>
                                <div className='block bubble success slotted-fix'>
                                    <p>
                                        很高兴认识你!
                                    </p>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonAvatar slot='start'>
                                        <img src="/assets/female1.png" />
                                    </IonAvatar>
                                    <div slot="start" className='bubble primary'>
                                        <p>
                                            Nice to meet you too!
                                        </p>
                                    </div>
                                </IonItem>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>

                <IonFooter>
                    <IonToolbar>
                        <div className='talk'>
                            <div className='talk-content'>
                                <IonInput value={text} onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </div>
                            <div className='talk-btn'>
                                <IonButton color="primary">
                                    <IonIcon icon={paperPlaneOutline} />
                                </IonButton>

                            </div>
                            <div className='talk-btn' id="add">
                                <IonButton shape="round" color="primary">
                                    <IonIcon icon={addCircleOutline} />
                                </IonButton>
                            </div>
                        </div>
                    </IonToolbar>
                </IonFooter>
            </div>
        </IonPage>
    );


};

export default Chat;