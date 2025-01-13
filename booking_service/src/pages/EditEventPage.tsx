import Header from '../components/Header';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventData, fetchFilledCustomData, getInfoRegisterForEvent } from '../store/api-actions';

import { useAppDispatch, useAppSelector } from '../hooks';
import EditEventForm from '../components/EditEventForm';
import { getEvent, getFilledCustom, getInfoForRegister } from '../store/events-process/selectors';

export default function EditEventPage() {
    const urlParams = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));
        dispatch(getInfoRegisterForEvent({ id: Number(urlParams.id) }));
        dispatch(fetchFilledCustomData({ id: Number(urlParams.id) }));
    }, [dispatch, urlParams.id]);
    const filledCustom = useAppSelector(getFilledCustom);
    const event = useAppSelector(getEvent);
    const infoForRegister = useAppSelector(getInfoForRegister);
    return (
        <>
            <Header />
            <EditEventForm event={event} customField={infoForRegister?.custom_fields} filledCustom={filledCustom} />
        </>
    );
}
