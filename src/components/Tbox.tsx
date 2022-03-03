import {
    IonItem,
} from '@ionic/react';

import { Props, useState } from 'react';
import './Tbox.css'
import { paperPlaneOutline, add, construct } from 'ionicons/icons';

export interface Msg {
    val?: string
    visible?: boolean
}

const Tbox: React.FC<Msg> = ({ val, visible = false }) => {

    return (
        visible == true ?
            <IonItem className='remove_inner_bottom'>
                <div className='block bubble medium slotted-fix'>
                    <p>
                        {val}
                    </p>
                </div>
            </IonItem>
            : null
    );


};

export default Tbox;