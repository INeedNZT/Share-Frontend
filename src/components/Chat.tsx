import {
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
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
    IonThumbnail,
    IonImg,
} from '@ionic/react';
import { useState, useContext, useRef, useEffect } from 'react';
import './Chat.css'
import { image } from 'ionicons/icons';
import Tbox from './Tbox';
import { SocketContext, UserContext, TranslateContext } from '../App';
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';


export interface Group {
    groupId: string
}


const Chat: React.FC<Group> = ({ groupId }) => {

    const socket = useContext(SocketContext);
    const t_socket = useContext(TranslateContext);
    const c = useContext(UserContext);
    const history = useHistory();

    console.log("start code of Chat Page")
    console.log("get user context, ", c);

    type Msg = {
        content?: string
        sender: string // user id,
        chinese?: string
        isShow?: boolean,
        isTrans?: boolean,
        sex: string,
        userName: string,
        isPhoto?: boolean,
        imgData?: string
    }

    const [text, setText] = useState<string>("");
    const [mlist, setMlist] = useState<Array<Msg>>([]);


    const translate = (m: Msg, i: number) => {
        if (!mlist[i].isTrans) {
            mlist[i].isTrans = !(mlist[i].isTrans);
            mlist[i].isShow = false;
            setMlist(mlist.concat([]));
        } else {
            console.log("translate function: " + m.content);
            mlist[i].isShow = true;
            mlist[i].chinese = 'Waiting for translation...';
            setMlist(mlist.concat([]));
            t_socket.emit("getChinese", { text: m.content, index: i.toString() }, (data: any) => {
                mlist[data.index].chinese = data.text;
                mlist[data.index].isTrans = false;
                setMlist(mlist.concat([]));
            });
        }

    }

    const regMsg = () => {
        socket.removeAllListeners("rmessage");
        socket.on("rmessage", (d) => {
            console.log("my rmessage");
            console.log(d);
            regMsg();
            const isPhoto = d.imgData ? true : false;
            setMlist(mlist.concat({
                content: d.msg, sender: d.userId, chinese: '', isShow: false,
                isTrans: true, sex: d.sex, userName: d.userName, isPhoto: isPhoto,
                imgData: d.imgData
            }));
        })
    }

    regMsg();


    useIonViewWillEnter(() => {
        console.log("enter Chat View!!!!")
        const header = document.getElementById("chat-header");
        const footer = document.getElementById("chat-footer");
        const grid = document.getElementById("chat-grid");
        const headerHeight = header?.clientHeight;
        const footerHeight = footer?.clientHeight;
        grid!.style.height = window.innerHeight + "px";
        grid!.style.paddingTop = headerHeight + "px";
        grid!.style.paddingBottom = footerHeight + "px";
        if (c) {
            socket.emit("joinRoom", { userId: c.u.userId, groupId: groupId })
        }
    })

    useIonViewWillLeave(() => {
        if (c) {
            socket.emit("quitRoom", { userId: c.u.userId, groupId: groupId })
            socket.removeAllListeners("rmessage");
        }
    })

    useEffect(() => {
        const grid = document.getElementById("chat-grid");
        grid?.scrollTo({ top: grid.scrollHeight });
    }, [mlist])

    const addToList = (data: { msg: string, userId: string, 
                                sex: string, userName: string }) => {
        const m: Msg = {
            content: data.msg, sender: data.userId, chinese: '', isShow: false,
            isTrans: true, sex: data.sex, userName: data.userName, isPhoto: false, imgData: ''
        };
        socket.emit("smessage", {
            content: data.msg, userId: data.userId, groupId: groupId,
            sex: data.sex, userName: data.userName, imgData:''
        })
        setMlist(mlist.concat(m)); // trigger state change
    }

    const postMessage = () => {
        if (c) {
            console.log("get userId! " + c.u.userId);
            console.log(c);
            const t = text;
            setText('');
            addToList({ msg: t, userId: c.u.userId, sex: c.u.sex, userName: c.u.userName });
        }
    }

    const selectImg = async () => {
        Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
        })
            .then((image) => {
                if (c) {
                    socket.emit("smessage", {
                        content: '', userId: c.u.userId, groupId: groupId,
                        sex: c.u.sex, userName: c.u.userName, imgData: image.dataUrl
                    })
                    setMlist(mlist.concat({
                        sender: c.u.userId, userName: c.u.userName,
                        sex: c.u.sex, imgData: image.dataUrl, isPhoto: true
                    }))
                }
            })
            .catch((callback) => {
                // do nothing
            })
    }

    const addPhoto = () => {
        selectImg();
    }


    return (
        <IonPage>
            <div id="chat">
                <IonListHeader id='chat-header'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons>
                        <IonTitle>Group Chat</IonTitle>
                    </IonToolbar>
                </IonListHeader>

                <div id="chat-content" slot='fixed'>
                    <IonGrid fixed={true} id="chat-grid">
                        {mlist && mlist.map((m, index) => {
                            return c?.u.userId != m.sender ?
                                (<IonRow key={index}>
                                    <IonCol>
                                        <IonItem className='remove_inner_bottom'>
                                            <IonAvatar slot='start'>
                                                <img src={m.sex == 'male' ? '/assets/male1.png' : '/assets/female1.png'} />
                                                <small>{m.userName}</small>
                                            </IonAvatar>
                                            {m.isPhoto ? (<div slot="start" className='bubble primary'>
                                                <IonImg src={m.imgData} />
                                            </div>)
                                                : (<div slot="start" className='bubble primary'>
                                                    <p>
                                                        {m.content}
                                                    </p>
                                                    <IonBadge color="secondary" slot='fixed' onClick={() => translate(m, index)} >{m.isTrans ? "Translate" : "Hide"}</IonBadge>
                                                </div>)
                                            }
                                        </IonItem>
                                        <Tbox solt='start' val={m.chinese} visible={m.isShow}></Tbox>
                                    </IonCol>
                                </IonRow>) :
                                (<IonRow key={index}>
                                    <IonCol>
                                        <IonItem className='remove_inner_bottom'>
                                            {m.isPhoto ? (<div slot="end" className='bubble success slotted-fix'>
                                                <IonImg src={m.imgData} />
                                            </div>)
                                                : (<div slot="end" className='bubble success slotted-fix'>
                                                    <p>
                                                        {m.content}
                                                    </p>
                                                    <IonBadge color="secondary" slot='fixed' onClick={() => translate(m, index)}>{m.isTrans ? "Translate" : "Hide"}</IonBadge>
                                                </div>)
                                            }
                                            <IonAvatar slot='end'>
                                                <img src={c?.u.sex == 'male' ? '/assets/male1.png' : '/assets/female1.png'} />
                                                <small>{m.userName}</small>
                                            </IonAvatar>
                                        </IonItem>
                                        <Tbox solt='end' val={m.chinese} visible={m.isShow}></Tbox>
                                    </IonCol>
                                </IonRow>)
                        })}
                    </IonGrid>
                </div>
                <IonFooter id='chat-footer'>
                    <IonToolbar>
                        <div className='talk'>
                            <div className='talk-content'>
                                <IonInput id='msg-box' value={text} placeholder="type something..." onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </div>
                            <div className='talk-btn'>
                                <IonButton color="primary" onClick={postMessage}>
                                    Send
                                </IonButton>

                            </div>
                            <div className='talk-btn' id="add">
                                <IonFab vertical="center" horizontal="end" slot="fixed" onClick={addPhoto}>
                                    <IonFabButton size='small'>
                                        <IonIcon icon={image}></IonIcon>
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