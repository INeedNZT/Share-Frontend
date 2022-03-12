import {
    useIonViewWillEnter
} from '@ionic/react';
import './Article.css';
import { UserContext } from '../App';
import { UserDetailPageProps } from '../type';
import { useContext } from 'react';



const ArticlePage: React.FC<UserDetailPageProps> = ({ match }) => {

    const c = useContext(UserContext);
    console.log("start code of Article page")
    console.log("get user context, ", c);

    useIonViewWillEnter(() => {
        console.log("enter Article View!!!!")
    });

    return (
        <div>
        </div>
    );
};

export default ArticlePage;