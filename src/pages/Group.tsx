import {
    useIonViewWillEnter
} from '@ionic/react';
import './Group.css';
import Chat from '../components/Chat';
import { UserContext } from '../App';
import { UserDetailPageProps } from '../type';
import { useContext } from 'react';



const GroupPage: React.FC<UserDetailPageProps> = ({ match }) => {

    const c = useContext(UserContext);
    console.log("start code of Group page")
    console.log("get user context, ", c);

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