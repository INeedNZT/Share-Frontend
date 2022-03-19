import {
    IonItem,
} from '@ionic/react';

import { Props, useState } from 'react';
import './Tbox.css'
import { paperPlaneOutline, add, construct } from 'ionicons/icons';

export interface Msg {
    val?: string,
    visible?: boolean,
    solt?: string
}

const Tbox: React.FC<Msg> = ({ val, visible = false, solt = 'start' }) => {

    return (
        visible == true ?
            <IonItem className='remove_inner_bottom' >
                <div slot={solt} className="block bubble medium">
                    <p>
                        {val}
                    </p>
                </div>
            </IonItem>
            : null
    );


};

export default Tbox;