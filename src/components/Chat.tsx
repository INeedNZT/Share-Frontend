import {
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonContent,
    IonItem,
    IonTitle,
    IonToolbar,
    IonListHeader,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    useIonViewWillEnter,
    IonFooter,
    IonPage,
    IonFab,
    IonFabButton,
    IonBadge,
    useIonViewWillLeave,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import { useState, useContext, useRef, useEffect } from 'react';
import './Chat.css'
import { paperPlaneOutline, add, storefront } from 'ionicons/icons';
import Tbox from './Tbox';
import { SocketContext, StorageContext, UserContext, TranslateContext } from '../App';
import { useHistory } from 'react-router-dom';
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime';

export interface Group {
    groupId: string
}



const Chat: React.FC<Group> = ({ groupId }) => {

    console.log("start code of Chat Page")

    const storage = useContext(StorageContext);
    const socket = useContext(SocketContext);
    const t_socket = useContext(TranslateContext);
    const c = useContext(UserContext);
    const history = useHistory();
    const contentEle = useRef<HTMLIonContentElement>(null);

    type Msg = {
        content: string
        sender: string // user id,
        chinese: string
        isShow: boolean
    }

    const [text, setText] = useState<string>("");
    const [mlist, setMlist] = useState<Array<Msg>>([]);

    // const sotreList = async (list: any) => {
    //     await storage.set('123_12', list);
    // }

    // useEffect(() => {
    //     contentEle.current?.scrollToBottom();
    //     sotreList(mlist);
    //     console.log("already store the mlist")
    //     console.log(mlist)
    // }, [mlist])

    const translate = (m: Msg, i: number) => {
        console.log("translate function: " + m.content)
        t_socket.emit("getChinese", { text: m.content, index: i.toString() });
        mlist[i].isShow = true;
        t_socket.on("rtranslation", (data) => {
            console.log("rtranslation!!!!!");
            mlist[data.index].chinese = data.text;
            t_socket.off("rtranslation");

            setMlist(mlist.concat([]));
        })
    }


    // const getList = async () => {
    //     const list = await storage.get('123_12');
    //     console.log("get the list from storage")
    //     console.log(list)
    //     if (!list) { 
    //         setMlist(new Array<Msg>());
    //     } else {
    //         setMlist(list);
    //     }
    // }

    const clearList = async () => {
        await storage.clear();
    }

    socket.on("rmessage", (d) => {
        console.log("my rmessage");
        console.log(d);
        setMlist(mlist.concat({ content: d.msg, sender: d.userId, chinese: '', isShow: false }));
        contentEle.current?.scrollToBottom();
    })

    useIonViewWillEnter(() => {
        console.log("enter Chat View!!!!")
        // console.log(user.userId);
        // if (!user.userId) {
        //     history.push("/home");
        // }
        if (c) {
            c.u.userId = Math.floor(Math.random() * 5).toString();
            socket.emit("joinRoom", { userId: c.u.userId, groupId: groupId })
        }
    })

    useIonViewWillLeave(() => {
        if (c) {
            socket.emit("quitRoom", { userId: c.u.userId, groupId: groupId })
        }
    })

    const addToList = (data: { msg: string, userId: string }) => {
        const m: Msg = { content: data.msg, sender: data.userId, chinese: '', isShow: false };
        socket.emit("smessage", { content: data.msg, userId: data.userId, groupId: groupId })
        setMlist(mlist.concat(m)); // trigger state change
        contentEle.current?.scrollToBottom();
    }

    const postMessage = () => {
        if (c) {
            console.log("get userId! " +  c.u.userId );
            console.log(c);
            const t = text;
            setText('');
            addToList({ msg: t, userId: c.u.userId });
        }
    }

    const addPhoto = () => {
        clearList();
    }


    return (
        <IonPage>
            <div id="chat">
                <IonListHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons>
                        <IonTitle>Group Chat</IonTitle>
                    </IonToolbar>
                </IonListHeader>

                <IonContent fullscreen={true} ref={contentEle}>
                    <IonGrid>
                        {mlist && mlist.map((m, index) => {
                            return c?.u.userId != m.sender ?
                                (<IonRow key={index}>
                                    <IonCol>
                                        <IonItem className='remove_inner_bottom'>
                                            <IonAvatar slot='start'>
                                                <img src="/assets/male1.png" />
                                            </IonAvatar>
                                            <div slot="start" className='bubble primary'>
                                                <p>
                                                    {m.content}
                                                </p>
                                                <IonBadge color="secondary" slot='fixed' id="badge" onClick={() => translate(m, index)}>Translate</IonBadge>
                                            </div>
                                        </IonItem>
                                        <Tbox val={m.chinese} visible={m.isShow}></Tbox>
                                    </IonCol>
                                </IonRow>) :
                                (<IonRow key={index}>
                                    <IonCol>
                                        <IonItem className='remove_inner_bottom'>

                                            <div slot="end" className='bubble success slotted-fix'>

                                                <p>
                                                    {m.content}
                                                </p>
                                                <IonBadge color="secondary" slot='fixed' id="badge" onClick={() => translate(m, index)}>Translate</IonBadge>
                                            </div>
                                            <IonAvatar slot='end' className="mr-fix">
                                                <img src="/assets/male1.png" />
                                            </IonAvatar>
                                        </IonItem>
                                        <Tbox val={m.chinese} visible={m.isShow}></Tbox>
                                    </IonCol>
                                </IonRow>)
                        })}
                    </IonGrid>
                </IonContent>

                <IonFooter>
                    <IonToolbar>
                        <div className='talk'>
                            <div className='talk-content'>
                                <IonInput value={text} onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </div>
                            <div className='talk-btn'>
                                <IonButton color="primary" onClick={postMessage}>
                                    &nbsp;
                                    <IonIcon icon={paperPlaneOutline} />
                                    &nbsp;
                                </IonButton>

                            </div>
                            <div className='talk-btn' id="add">
                                <IonFab vertical="center" horizontal="end" slot="fixed" onClick={addPhoto}>
                                    <IonFabButton size='small'>
                                        <IonIcon icon={add}></IonIcon>
                                    </IonFabButton>
                                </IonFab>
                            </div>
                        </div>
                    </IonToolbar>
                </IonFooter>
            </div>
        </IonPage>
    );


};

export default Chat;