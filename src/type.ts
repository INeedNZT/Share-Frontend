import { RouteComponentProps } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

export type User = {
    userId: string,
    userName: string,
    password: string,
    sex:string,
    age:number
}

export interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }

export type C = {
    u: User,
    setU: Function
} | null